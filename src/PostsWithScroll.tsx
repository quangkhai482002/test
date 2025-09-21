import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Stack,
  Box,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";

async function fetchPosts(page: number) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
  );
  return res.json();
}

export default function PostsWithScroll() {
  const [page, setPage] = React.useState(1);
  const [allPosts, setAllPosts] = React.useState<any[]>([]);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
  });

  React.useEffect(() => {
    if (data) {
      setAllPosts((prev) => [...prev, ...data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // handle scroll event
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !isFetching) {
      setPage((p) => p + 1);
    }
  };

  return (
    <Box
      ref={containerRef}
      onScroll={handleScroll}
      sx={{
        height: 400, // chiều cao cố định
        overflowY: "auto",
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 2,
      }}
    >
      <Stack spacing={2}>
        {allPosts.map((post) => (
          <Box
            key={post.id}
            sx={{ p: 2, border: "1px solid #eee", borderRadius: 1 }}
          >
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2">{post.body}</Typography>
          </Box>
        ))}

        {(isLoading || isFetching) && <CircularProgress />}
        {isError && <Typography>Lỗi khi load dữ liệu</Typography>}
      </Stack>
    </Box>
  );
}
