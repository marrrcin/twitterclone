using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TwitterPgSqlClone.Data
{
    public class PostsRepository
    {
        private PostsPgsqlDb Database = new PostsPgsqlDb();

        public IQueryable<post> Posts
        {
            get { return Database.posts; }
        }

        public void AddNewPost(string text, string author)
        {
            Database.posts.Add(new post {author = author, text = text});
            Database.SaveChanges();
        }

        public bool DeletePost(int id)
        {
            var post = Database.posts.Find(id);
            if (post != null)
            {
                Database.posts.Remove(post);
                Database.SaveChanges();
                return true;
            }
            return false;
        }

        public bool ModifyPost(int id, string text)
        {
            var post = Database.posts.Find(id);
            if (post != null)
            {
                post.text = text;
                Database.SaveChanges();
                return true;
            }
            return false;
        }
    }
}