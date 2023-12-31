import Navigate from "../../components/Navigate"
import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, TextField, useMediaQuery } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import SearchFeed from "../../components/SearchFeed";
const SearchPage = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const [feed, setFeed] = useState([]);
    const token = useSelector(state => state.token);
    const [search, setSearch] = useState("");
    const handleSearch = async () => {
        if(search!==""){
            const searchRes = await fetch(`http://localhost:3001/users/search/${search}/`, {
                method: "GET",  
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await searchRes.json();
            setFeed(data);
        }
    }
    return <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Navigate plateformName={"TweetVerse"}></Navigate>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.2rem", m: "1rem", width: isNonMobile ? "40%" : "90%" }}>
            <TextField size="small" placeholder="" label="Search" sx={{ width: "100%" }} inputMode="search" value={search} onChange={(e)=> setSearch(e.target.value)}></TextField>
            <SearchIcon sx={{ borderRadius: "0.3rem", p: "0.4rem", ":hover": { bgcolor: "lightgray" } }} onClick={handleSearch} ></SearchIcon>
        </Box>
        {/* {
            feed.map(({_id,firstName,lastName,bio}) => (
            <SearchFeed key={_id} 
                firstName={firstName}
                lastName={lastName}
                bio={bio}
                />
            ))
        } */}
        {
  Array.isArray(feed) && feed.length > 0 ? (
    feed.map(({ _id, firstName, lastName, bio }) => (
      <SearchFeed
        key={_id}
        firstName={firstName}
        lastName={lastName}
        bio={bio}
      />
    ))
  ) : (
    <p>No search results found.</p> // Display a message when there are no results.
  )
}
    </Box>
}
export default SearchPage