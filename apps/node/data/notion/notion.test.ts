import { expect, test, describe, type TestOptions } from 'vitest';
import * as notion from '.';

const { getAllBlogPosts, getBlogPostBySlug } = notion;
const testOptions: TestOptions = {
  timeout: 90 * 1000
};


describe('db: notion', () => {

  test('read all blog posts', testOptions, async () => {
    debugger;
    const posts = await getAllBlogPosts();
    // console.log({ posts });
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('slug');
  },);

  test('read one blog post knowing its slug', testOptions, async () => {
    const posts = await getAllBlogPosts();
    const postSlug = posts[0].slug;
    const post = await getBlogPostBySlug(postSlug);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('slug');
  });
});
