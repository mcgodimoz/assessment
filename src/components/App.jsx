import React, { useState, useEffect } from 'react';
import { CircularProgress, Container, Pagination } from '@mui/material';
import Filter from './Filter';
import Post from './Post';

function App() {
  let [posts, setPosts] = useState([]);
  let [filter, setFilter] = useState(false);
  let [filteredPosts, setFilteredPosts] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    //fetching data from mock api
    fetch('/api/posts')
      .then((response) => response.json())
      .then((json) => {
        setPosts(json.posts);
        return json.posts;
      });
  }, []);

  // Reset the pagination when filter changes
  const onFilterChange = () => {
    setCurrentPage(1);
  };

  // post list view with pagination
  const PostView = ({ itemByPages = 4 }) => {
    let data = filter ? filteredPosts : posts;
    let dataArray = [];
    let temp = [];

    // split the list into a multidimensional array by the items per page
    for (let i = 1; i < data.length; i++) {
      temp.push(data[i - 1]);
      if ((i / itemByPages) % 1 === 0) {
        dataArray.push(temp);
        temp = [];
      }
    }
    if (temp.length > 0) dataArray.push(temp);

    // total number of the pages for the pagination
    let pages = dataArray.length;

    // return the view based on the data available
    return data?.length > 0 ? (
      <>
        <Container
          style={{
            marginTop: '20px',
            height: '730px',
            scrollBehavior: 'smooth',
            overflowX: 'auto',
          }}
        >
          {dataArray[currentPage - 1]?.map((post) => (
            <Post key={post.id + '-post'} post={post} />
          ))}
        </Container>
        <Container
          sx={{
            width: '100%',
            textAlign: 'right',
          }}
        >
          <Pagination
            sx={{
              marginTop: '20px',
              display: 'inline-flex',
            }}
            count={pages}
            defaultPage={currentPage}
            onChange={(event, page) => {
              setCurrentPage(page);
            }}
            variant="outlined"
            shape="rounded"
          />
        </Container>
      </>
    ) : (
      // loading view until the data view render
      <Container sx={{ width: '100%', textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  };

  return (
    <Container
      style={{
        marginTop: '30px',
        width: '100vw',
      }}
    >
      {/* Category Filter */}
      <Filter
        posts={posts}
        setFilteredPosts={setFilteredPosts}
        setFilter={setFilter}
        resetPage={onFilterChange}
      />
      <PostView />
    </Container>
  );
}

export default App;
