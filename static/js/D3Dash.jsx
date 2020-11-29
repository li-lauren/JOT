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
            margin = 20,
            diameter = +svg.attr("width"),
            g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
        
        var color = d3.scaleLinear()
            .domain([-1, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(d3.interpolateHcl);
        
        // Create a new pack layout (which expects json)
        var pack = d3.pack()
            .size([diameter - margin, diameter - margin])
            .padding(2);

        // let root = {
        //     "name": "All",
        //     "children": [
        //         {
        //             "name": "Science", 
        //             "children": [
        //                 {
        //                     "name": "Science",
        //                     "children": [
        //                         {
        //                             "name": "Astronomy", 
        //                             "children": [
        
        //                             ]
        //                         },
        //                         {
        //                             "name": "History", 
        //                             "children": [
        //                                 {
        //                                     "name": "Hundreds of Copies of Newton's Principia Found in New Census", 
        //                                     "doc_id": 9, 
        //                                     "value": 25
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "name": "Math",
        //                             "children": [
        //                                 {
        //                                     "name": "Erik Demaine wins 2020 MIT Bose Award for Excellence in Teaching", 
        //                                     "doc_id": 16,
        //                                     "value": 10
        //                                 }
        //                             ]
        //                         }, 
        //                         {
        //                             "name": "Biology",
        //                             "children": [
        //                                 {
        //                                     "name": "The Last Children of Down Syndrome",
        //                                     "doc_id": 6,
        //                                     "value": 14
        //                                 },
        //                                 {
        //                                     "name": "Neuroscientist Viviana Gradinaru Receives Young Investigator Award",
        //                                     "doc_id": 10,
        //                                     "value": 8
        //                                 },
        //                                 {
        //                                     "name": "How Stem Cells Choose their Careers",
        //                                     "doc_id": 11,
        //                                     "value": 21
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     "name": "Technology",
        //                     "children": [
        //                         {
        //                             "name": "Computer Science",
        //                             "children": [
        //                                 {
        //                                     "name": "A neural network learns when it should not be trusted",
        //                                     "doc_id": 15,
        //                                     "value": 18
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "name": "Engineering", 
        //                             "children": [
        //                                 {
        //                                     "name": "How the F@!# Did This Giant Whale Tail Save a Derailed Train?", 
        //                                     "doc_id": 3, 
        //                                     "value": 12
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             "name": "Health", 
        //             "children": [
        //                 {
        //                     "name": "Medicine",
        //                     "children": [
        
        //                     ]
        //                 }, 
        //                 {
        //                     "name": "Exercise",
        //                     "children": [
        
        //                     ] 
        //                 },
        //                 {
        //                     "name": "Wellness",
        //                     "children": [
        
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             "name": "Arts", 
        //             "children": [
        //                 {
        //                     "name": "Visual Arts", 
        //                     "children": [
        //                         {
        //                             "name": "Design", 
        //                             "children": [
        //                                 {
        //                                     "name": "Editorial Design : New Brutalism Controversial Concrete", 
        //                                     "doc_id": 4,
        //                                     "value": 24
        //                                 }
        //                             ]
        //                         },
        //                         {
        //                             "name": "Fine Arts", 
        //                             "children": [
        //                                 {
        //                                     "name": "Prized Hockney Portrait Will Stay at London’s Royal Opera House Following Sale: Report", 
        //                                     "doc_id": 5, 
        //                                     "value": 14
        //                                 }
        
        //                             ]
        //                         },
        //                         {
        //                             "name": "Architecture", 
        //                             "children": [
        //                                 {
        //                                     "name": "Public opinion has softened its views on Brutalism. That isn’t enough to stay the wrecking ball.",
        //                                     "doc_id": 1,
        //                                     "value": 35
        //                                 }, 
        //                                 {
        //                                     "name": "Editorial Design : New Brutalism Controversial Concrete", 
        //                                     "doc_id": 4,
        //                                     "value": 24
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 }, 
        //                 {
        //                     "name": "Music & Performance Arts", 
        //                     "children": [
        //                         {
        //                             "name": "Music",
        //                             "children": [
        
        //                             ]
        //                         }, 
        //                         {
        //                             "name": "Dance",
        //                             "children": [
        
        //                             ]
        //                         },
        //                         {
        //                             "name": "Theater",
        //                             "children": [
        
        //                             ]
        //                         }, 
        //                         {
        //                             "name": "Comedy",
        //                             "children": [
        
        //                             ]
        //                         }
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             "name": "Books", 
        //             "children": [
        
        //             ]
        //         },
        //         {
        //             "name": "Entertainment", 
        //             "children": [
        //                 {
        //                     "name": "Film",
        //                     "children": [
        
        //                     ]
        //                 }, 
        //                 {
        //                     "name": "TV", 
        //                     "children": [
        
        //                     ]
        //                 }, 
        //                 {
        //                     "name": "Events",
        //                     "children": [
        
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             "name": "Food", 
        //             "children": [
        
        //             ]
        //         }, 
        //         {
        //             "name": "Politics", 
        //             "children": [
        
        //             ]
        //         },
        //         {
        //             "name": "Business", 
        //             "children": [
        
        //             ]
        //         },
        //         {
        //             "name": "Sports", 
        //             "children": [
        
        //             ]
        //         }, 
        //         {
        //             "name": "Other", 
        //             "children": [
        
        //             ]
        //         }
        //     ]
        // }
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
        
        // Append group (circle)
        var circle = g.selectAll("circle")
            .data(nodes) // join with nodes array
            .enter().append("circle") // for each node add a circle
            .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; }) // assign class names to each circle
            .style("fill", function(d) { return d.children ? color(d.depth) : null; }) // give circle a depth-based color
            .style("fill-opacity", function(d) { return d.value > 0 ? 1 : 0; })
            .on("dblclick", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); })
            

        // Append title/label for each node
        var text = g.selectAll("text")
            .data(nodes)
            .enter().append("text") // append a text element for each node
            .attr("class", "label") // assign label as the class name
            .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
            .style("display", function(d) { return (d.parent === root) ? "inline" : "none"; }) // only show text if the parent = curr root
            .style('pointer-events', 'auto')
            .on("click", function(d) {
                console.log('CLICKED')
                console.log(d.data.name)
                console.log(d.data)
                d3.event.stopPropagation();
                clickHandler(d)
                })
            .text(function(d) { return d.value > 0 ? d.data.name : ''; }) // retrieve name (from json data) and set as text
            
        
        

        var node = g.selectAll("circle,text");

        svg
            .style("background", color(-1))
            .on("dblclick", function() { zoom(root); });

        zoomTo([root.x, root.y, root.r * 2 + margin]);

        function zoom(d) {
            var focus0 = focus; focus = d;

            var transition = d3.transition()
                .duration(d3.event.altKey ? 7500 : 750)
                .tween("zoom", function(d) {
                var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                return function(t) { zoomTo(i(t)); };
                });

            transition.selectAll("text")
            .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
                .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
                .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
                .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
        }

        function zoomTo(v) {
            var k = diameter / v[2]; view = v;
            node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
            circle.attr("r", function(d) { return d.r * k; });
        }

    }



    }, [tagTree])

    return (
        <svg 
            width="960" 
            height="960" 
            ref={ref}
        />
    )
}