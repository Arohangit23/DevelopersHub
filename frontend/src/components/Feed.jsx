import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true
      });
      dispatch(addFeed(res?.data?.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      getFeed();
    }
  }, [user])

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to DevHub</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          Connect with developers worldwide. Build your network and collaborate on exciting projects.
        </p>
        <Link 
          to="/login" 
          className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
        >
          Get Started
        </Link>
      </div>
    );
  }

  if(!feed) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-gray-800 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if(feed.length <= 0) return <h1 className="flex justify-center my-10">No user found!</h1>

  return (
    feed && ( 
      <div className="flex justify-center">
        <UserCard user={feed[0]}/>
      </div>
    )
  )
}

export default Feed