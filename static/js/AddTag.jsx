const AddTag = () => {
    const [tag, setTag] = useState('')

    const handleInput = e => {
        setTag(e.target.value)
    }

    return(
        <Form inline>
            <Form.Label htmlFor="inlineFormInputName2" srOnly>
                Add Tag
            </Form.Label>
            <Form.Control
                className="mb-2 mr-sm-2"
                id="inlineFormInputName2"
                placeholder="Add Tag"
                value={tag}
                onChange={handleInput}
            />
            
            <Button type="submit" className="mb-2" size="sm">
                +
            </Button>
        </Form>
    )
}