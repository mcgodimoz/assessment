import { Container, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';

function Filter({ posts, setFilteredPosts, setFilter, resetPage }) {
  const [categorylist, setCategorylist] = useState(() => []);
  const [categories, setCategories] = useState([]);

  // to handle the changes when category filtered
  const handleCategories = (event, newCategories) => {
    resetPage();
    setCategorylist(newCategories);
    let filteredPosts = posts.filter((post) => {
      for (let category of post.categories) {
        if (newCategories.includes(category.name)) return true;
      }
      return false;
    });
    if (filteredPosts.length > 0) {
      setFilteredPosts(filteredPosts);
      setFilter(true);
    } else {
      setFilter(false);
    }
  };

  // each row only contains 4 category. This view will render for each row.
  const RowView = ({ row }) => {
    return (
      <ToggleButtonGroup
        key={'extra'}
        sx={{ width: '100%', justifyContent: 'center' }}
        value={categorylist}
        onChange={handleCategories}
        aria-label="Post Category"
      >
        {row.map((category) => {
          return (
            <ToggleButton key={category} value={category} aria-label={category}>
              {category}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    );
  };

  const TabGroupView = () => {
    let content = [];
    let row = [];
    // to split the category into 4 in a row for better UI experince
    for (let i = 1; i < categories.length + 1; i++) {
      row.push(categories[i - 1]);
      // create the row when 4 category are in the row & clear the row for next row
      if ((i / 4) % 1 === 0) {
        content.push(<RowView row={row} />);
        row = [];
      }
    }

    // create the last row if there less than 4 category
    if (row.length > 0) content.push(<RowView row={row} />);

    return <Container>{content}</Container>;
  };

  useEffect(() => {
    function run() {
      // set the Categories object list from the post data.
      let categoryNames = [];
      for (let post of posts) {
        for (let category of post.categories) {
          if (categoryNames.length === 0) {
            categoryNames.push(category.name);
          } else {
            if (!categoryNames.includes(category.name)) {
              categoryNames.push(category.name);
            }
          }
        }
      }

      setCategories(categoryNames);
    }
    run();
  }, [posts]);

  return <TabGroupView />;
}

export default Filter;
