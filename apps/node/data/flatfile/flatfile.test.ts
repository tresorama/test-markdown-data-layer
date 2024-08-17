import { expect, test, describe } from 'vitest';
import { getAllBlogPosts, getAllBlogPostSlugs, getBlogPostBySlug } from '.';


describe('db: flat-file', () => {

  test('read all blog posts', async () => {
    const posts = await getAllBlogPosts();
    // console.log({ posts });
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('slug');
  });

  test('read one blog post knowing its slug', async () => {
    const posts = await getAllBlogPosts();
    const postSlug = posts[0].slug;
    const post = await getBlogPostBySlug(postSlug);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('slug');
  });
});