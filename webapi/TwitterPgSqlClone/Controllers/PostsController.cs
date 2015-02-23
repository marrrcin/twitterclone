using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TwitterPgSqlClone.Data;

namespace TwitterPgSqlClone.Controllers
{
    [EnableCors(origins:"*",headers:"*",methods:"*")]
    public class PostsController : ApiController
    {
        private PostsRepository PostRepository = new PostsRepository();

        [HttpGet]
        [Route("api/posts")]
        public IEnumerable<post> Get()
        {
            return PostRepository.Posts;
        }

        [HttpGet]
        [Route("api/post/{id}")]
        public post Get(int id)
        {
            return PostRepository.Posts.FirstOrDefault(p => p.id == id);
        }

        [HttpGet]
        [Route("api/posts/{author}")]
        public IEnumerable<post> PostsByAuthor(string author)
        {
            return PostRepository.Posts.Where(p => p.author.ToLower() == author.ToLower());
        }

        [HttpPost]
        [Route("api/posts")]
        public void Post([FromBody]post post)
        {
            PostRepository.AddNewPost(post.text,post.author);
        }

        [HttpPut]
        [Route("api/post/{id}")]
        public HttpResponseMessage Put(int id, [FromBody]post post)
        {
            if (PostRepository.ModifyPost(id, post.text))
            {
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            return new HttpResponseMessage(HttpStatusCode.NotFound);
        }

        // DELETE api/<controller>/5
        [HttpDelete]
        [Route("api/post/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            if (PostRepository.DeletePost(id))
            {
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            return new HttpResponseMessage(HttpStatusCode.NotFound);
        }

        [HttpPost]
        [Route("api/posts/search")]
        public IEnumerable<post> SearchByText([FromBody]string text)
        {
            var query =  PostRepository.Posts.Where(p => p.text.Contains(text));
            return query;
        }
    }
}