const D3Dash = () => {
    const [tagTree, setTagTree] = useState(null)

    const ref = React.useRef()

    const history = useHistory()
    const clickHandler = d => {
        console.log('HANDLING CLICK')
        console.log(d)
        console.log(d.data)
        fetch(`/docs/${d.data.doc_id}`)
        .then(res => res.json())
        .then(data => {
            history.push('/article', {params: data})
        })
    }

    console.log(tagTree)

    const getTagTree = () => {
        fetch('/tagtree')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTagTree(data)})
    }

    useEffect(() => {
        getTagTree()
    }, [])

    useEffect(() => {
        if (tagTree) {

        const svg = d3.select(ref.current),
            margin = 50,
            diameter = +svg.attr("width"),
            g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
        
        var color = d3.scaleLinear()
            .domain([-1, 5])
            .range(["hsl(0, 0%, 15%)", "hsl(55, 27%, 83%)"])
            .interpolate(d3.interpolateHcl);

            // .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        
        // Create a new pack layout (which expects json)
        var pack = d3.pack()
            .size([diameter - margin, diameter - margin])
            .padding(2);

        
        let root = tagTree;
        
        // Constructs a root note from specified hiearchical data (data = obj representing the root node)
        // returned node has: data, depth, height, parent, children, value props
        // value: summed value of the node and its descendants
        // sum: evaluates specified value function for this node and each descendant, and returns this node
        // node.value of each node is set to numeric value returned from the fn plus combined value of all children
        root = d3.hierarchy(tagTree)
            .sum(function(d) { return d.value; }) // build a sum-based hierarchy aka each node's value = sum(children)
            .sort(function(a, b) { return b.value - a.value; }); 
        // sort children of this node, and each of this node's descendant's children using specified compare function 
        // returns this node; passes in two nodes
        
        // Pack the heirarchy
        var focus = root,
            nodes = pack(root).descendants(), // array of descendant nodes w/ parent, children, value, depth, x, y, r props
            view;
        
        var defs = g.append("defs");
            
        var images = defs.selectAll(null)
            .data(nodes)
            .enter().append("pattern")
            .attr("id", function(d) {
                if (d.children) {
                    return 0
                } else{
                    return `image${d.data.doc_id}`
                }
                })
            .attr("width", 1)
            .attr("height", 1)
            .attr("preserveAspectRatio", "none")
            .append("svg:image")
            .attr("xlink:href", function(d) {return d.children ? '' : d.data.img})
            .attr("width", function(d) {return d.r})
            .attr("height", function(d) {return d.r})
            .attr("preserveAspectRatio", "xMidYMid slice")


            

        // Append group (circle)
        var circle = g.selectAll("circle")
            .data(nodes) // join with nodes array
            .enter().append("circle") // for each node add a circle
            .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; }) // assign class names to each circle
            .style("fill", function(d) { return d.children ? color(d.depth) : `url(#image${d.data.doc_id})` }) // give circle a depth-based color
            .style("fill-opacity", function(d) { return d.value > 0 ? 1 : 0; })
            .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); })
            // .on("mouseover", d => mouseover(d))
            // .on("mouseout", d => mouseout(d))
            // .on("click", showLabel)
            

        // Append title/label for each node
        var text = g.selectAll("text")
            .data(nodes)
            .enter().append("text") // append a text element for each node
            .attr("class", "label") // assign label as the class name
            // .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
            .style("opacity", 1)
            .style("display", function(d) { 
                return (d.parent === root) ? "inline" : "none"; }) // only show text if the parent = curr root
            .style('pointer-events', 'auto')
            // .attr('width', function(d) { return d.r / 3 })
            // .style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8 ) / this.getComputedTextLength() * 24) + "px"; })
            .on("click", function(d) {
                d3.event.stopPropagation();
                clickHandler(d)
                })
            // .on("mouseover", d => mouseover(d))
            // .on("mouseout", d => mouseout(d))
            .text(function(d) { 
                return (d.value > 0) ? d.data.name : ''; 
            })
            .call(wrap, 100)
            
            
                // retrieve name (from json data) and set as text
            
        function mouseout(d) {  
            if (!('img' in d.data)) {
                text.style("opacity", 0)
            } else {text.style("opacity", 0)}}
        function mouseover(d) { 
            console.log(d.children)
            console.log(d.children && !('img' in d.children[0].data))
            
            if (d.children) {
                console.log(d.children[0].data)
                console.log('img' in d.children[0].data)
            }
            
            if (d.parent === focus && d.children && !('img' in d.children[0].data)) {text.style("opacity", 1)}
            // if ('img' in d.data) {text.style("opacity", 1)}
        }
        function showLabel(d) {
            if (d.children.length == 0) {text.style("opacity", 1) }
        }
        

        var node = g.selectAll("circle,text");
    

        svg
            .style("background", color(-1))
            .on("click", function() { zoom(root); }); // apply zoom behavior to root (the selection)
            // bind event listeners for zooming to root

        zoomTo([root.x, root.y, root.r * 2 + margin]); // initiate position

        function zoom(d) { // create a new zoom behavior
            var focus0 = focus; focus = d; // 

            var transition = d3.transition()
                .duration(d3.event.altKey ? 7500 : 750) // specify per-element duration (ms), slower if altKey is pressed
                .tween("zoom", function(d) { // register custom tween for "zoom", when transition starts, the func runs
                var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]); // interpolation method that
                // applies between 2 views (start and end), each is [cx, cy, width] (center (x,y) and size of viewport )
                return function(t) { zoomTo(i(t)); };
                });

            transition.selectAll("text")
            .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
                // .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
                .style("fill-opacity", 1)
                .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
                .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
            
            transition.selectAll("text")
            // .call(wrap, 100)
            .filter(function(d) { return !d.children })
                .style("fill-opacity", function(d) { return d === focus ? 1 : 0})
                .on("start", function(d) { 
                    if (d === focus) {
                        this.style.display = "inline"
                    } else {this.style.display = "none"} })
                .on("end", function(d) { 
                    if (d === focus) {this.style.display = "inline"}
                    else {this.style.display = "none"} })

            transition.selectAll("pattern")
                .style("fill-opacity", 0)
                
        }

        function wrap(text, width) {
            text.each(function () {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    x = text.attr("x"),
                    y = text.attr("y"),
                    dy = 0, //parseFloat(text.attr("dy")),
                    tspan = text.text(null)
                                .append("tspan")
                                .attr("x", x)
                                .attr("y", y)
                                .attr("dy", dy + "em");
                console.log(text.text())
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan")
                                    .attr("x", x)
                                    .attr("y", y)
                                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                                    .text(word);
                    }
                }
            });
        }

        // function wrap(d) {
        //     var text = d3.select(this),
        //       width = d.r * 2,
        //       x = d.x,
        //       y = d.y,
        //       words = text.text().split(/\s+/).reverse(),
        //       word,
        //       line = [],
        //       lineNumber = 0,
        //       lineHeight = 1.1,
        //       tspan = text.text(null).append("tspan").attr("x", x).attr("y", y);
        //     while (word = words.pop()) {
        //       line.push(word);
        //       tspan.text(line.join(" "));
        //       if (tspan.node().getComputedTextLength() > width) {
        //         line.pop();
        //         tspan.text(line.join(" "));
        //         line = [word];
        //         tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + "em").text(word);
        //       }
        //     }
        // }

        function zoomTo(v) {
            var k = diameter / v[2]; view = v;
            node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
            circle.attr("r", function(d) { return d.r * k; })
            images
            .attr("width", function(d) { return d.r * k * 2; })
            .attr("height", function(d) { return d.r * k * 2 ; })
        }

    }



    }, [tagTree])

    return (
        <div id='explorer'>
            <svg
                width="960" 
                height="960" 
                ref={ref}
                viewBox="0 0 960 960"
                preserveAspectRatio="xMidYMid meet"
            />
        </div>
        
    )
}