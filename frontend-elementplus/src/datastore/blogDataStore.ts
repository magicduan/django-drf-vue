import { Console } from 'console';
import {defineStore} from 'pinia'
import { ref,computed, inject } from 'vue'

interface Author{
    website: string,
    bio:string,
    user: {
      firstName:string,
      lastName:string,
      username:string
    }
}

export const useBlogData = defineStore("blogData",()=>{
 
   // const tagsMenu = ref([])
   const axios:any = inject('axios');
    async function  fetchTags(){
        let tags = []

        try {
            await axios.get('/tags/').then((response:{data:any})=>{
                tags = response.data.results;
            })
        } catch (error) {
            console.log(error);
        }
        return tags;
    }

    async function fetchPosts(){
        let posts = []
//        const axios:any = inject('axios');
        try{
            await axios.get('/posts/').then((response:{data:any})=>{
                posts = response.data.results;
            })
        }catch(error){
            console.log(error);
        }
        return posts;
    }

    async function fetchPostsByTag(tag:string){
        let posts = []
//        const axios:any = inject('axios');
        try{
            await axios.get('/posts/?tags__name='+tag).then((response:{data:any})=>{
                posts = response.data.results;
            })
        }catch(error){
            console.log(error);
        }
        return posts;
    }

    async function fetchPostsByUsername(username:string){
        let posts = []
//        const axios:any = inject('axios');
        try{
            await axios.get('/posts/?author__user__username='+username).then((response:{data:any})=>{
                posts = response.data.results;
            })
        }catch(error){
            console.log(error);
        }
        return posts;
    }

    async function fetchAuthorByUsername(username:string){
        let author = null
        try{
            await axios.get('/authors/?user__username='+username).then((response:{data:any})=>{
                author = response.data.results;
            })
        }catch(error){
            console.log(error);
        }
        return author;
    }

    async function retrievePostBySlug(slug:string){
        let post = null
        try{
            await axios.get('/posts/?slug='+slug).then((response:{data:any})=>{
                post = response.data.results;
            })
        }catch(error){
            console.log(error);
        }
        return post;
    }

    return {fetchTags,fetchPosts,fetchPostsByTag,fetchAuthorByUsername,fetchPostsByUsername,retrievePostBySlug}
})