const Filter = ({searchToken, handleSearchInput}) => {
    return (
        <div>filter shown with <input type="textbox" value={searchToken} onChange={handleSearchInput} /></div>
    )
}

export default Filter
