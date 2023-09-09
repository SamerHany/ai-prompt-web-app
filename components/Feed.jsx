'use client';
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchPosts, setSearchPosts] = useState([]);
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchText(keyword);

    const filteredPosts = posts.filter(post => post.prompt.includes(keyword) || post.tag.includes(keyword) || post.creator.username.includes(keyword));
    setSearchPosts(filteredPosts);
  }

  const handleTagClick = (tag) => {
    handleSearchChange({target: {value: tag}});
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setSearchPosts(data);
    }

    fetchPosts();
  }, []);


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchPosts}
        handleTagClick={handleTagClick}
      />

    </section>
  )
}

export default Feed