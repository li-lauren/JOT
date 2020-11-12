const getWindowDim = () => {
    // get inner width and height of the window

    const { w: width, h: height } = window;
    return { width, height };
}

// get Window Width x Height for XY position normalization
const updateWindowDim = () => {
    const [windowDim, setWindowDim] = useState(getWindowDim())

    const handleResize = () => {
        setWindowDim(getWindowDim());
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return windowDim;
}

// REF: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs