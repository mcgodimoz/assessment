import React from 'react';
import { Avatar, Box, Card, Typography } from '@mui/material';

// The post view for the post list
function Post({ post }) {
  return (
    <Card
      key={post.id}
      sx={{
        minWidth: 275,
        minHeight: '10px',
        margin: '30px',
        padding: '10px',
      }}
    >
      <Box
        key={post.id + '-title-row'}
        sx={{
          display: 'table',
          padding: '5px',
          marginTop: 'auto',
          marginBottom: 'auto',
        }}
      >
        <Typography
          key={post?.id + post?.title}
          sx={{
            margin: 0,
            paddingLeft: '15px',
            display: 'table-cell',
            verticalAlign: 'middle',
          }}
          variant="h6"
        >
          {post?.title}
        </Typography>
      </Box>
      <Box
        key={post.id + '-content-row'}
        sx={{
          display: 'flex',
          padding: '5px',
          marginTop: 'auto',
          marginBottom: 'auto',
        }}
      >
        <Typography
          key={post?.summary + 'summary'}
          sx={{
            margin: 0,
            paddingLeft: '15px',
            verticalAlign: 'middle',
          }}
          variant="body2"
        >
          {post?.summary}
        </Typography>
      </Box>
      <Box
        key={post?.author?.name + '-author-row'}
        sx={{
          paddingLeft: '15px',
          paddingTop: '25px',
          marginTop: 'auto',
          marginBottom: 'auto',
          display: 'table',
        }}
      >
        <Avatar
          sx={{ width: '20px', height: '20px' }}
          key={post?.author?.name + 'avtar'}
          alt={post?.author?.name}
          src={post?.author?.avatar}
        />
        <Typography
          key={post?.author?.name}
          sx={{
            margin: 0,
            paddingLeft: '5px',
            display: 'table-cell',
            verticalAlign: 'middle',
            fontWeight: 'bold',
          }}
          variant="caption"
        >
          {post?.author?.name}
        </Typography>
      </Box>
    </Card>
  );
}

export default Post;
