'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get('name');
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    }

    if (params?.id) {
      fetchPosts();
    }
  }, [params.id])


  const handleEdit = async (post) => {
    router.push((`/update-prompt?id=${post._id}`))
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });

        const filteredPosts = posts.filter((elem) => elem._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Profile
      name={params?.id == session?.user.id ? "My" : userName}
      desc={params?.id == session?.user.id ? "welcome to your personalized profile page" : `welcome to ${userName}'s personalized profile.`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile