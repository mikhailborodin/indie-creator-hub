import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container px-4 py-24 max-w-3xl mx-auto">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-48 mb-12" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container px-4 py-24 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold font-mono mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/#blog">Back to Blog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container px-4 py-24 max-w-3xl mx-auto">
        {/* Back button */}
        <Link
          to="/#blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Cover image */}
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-xl mb-8"
          />
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-muted-foreground mb-12">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {format(new Date(post.created_at), "MMMM d, yyyy")}
          </span>
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <div 
            className="text-foreground leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
