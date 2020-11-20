const Search = () => {
    const [searchTerm, setSearchTerm] = useState('')

    return(
        <div>
            <Form inline>
                <Form.Label htmlFor="inlineFormInputName2" srOnly>
                    Search
                </Form.Label>
                <Form.Control
                    className="mb-2 mr-sm-2"
                    id="inlineFormInputName2"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
               
                <Button type="submit" className="mb-2">
                    Submit
                </Button>
            </Form>

        </div>
    )
}