import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, ArrowLeft, Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ThemeToggle from "@/components/ThemeToggle";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  tech_stack: string[];
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  revenue: string | null;
  users_count: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Blog state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postFormData, setPostFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    published: false,
  });

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectFormData, setProjectFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    tech_stack: "",
    live_url: "",
    github_url: "",
    featured: false,
    revenue: "",
    users_count: "",
    sort_order: 0,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchPosts();
      fetchProjects();
    }
  }, [isAdmin]);

  // Blog functions
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast({ title: "Error fetching posts", variant: "destructive" });
    } else {
      setPosts(data || []);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setPostFormData({
      ...postFormData,
      title,
      slug: editingPost ? postFormData.slug : generateSlug(title),
    });
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postFormData.title || !postFormData.content || !postFormData.slug) {
      toast({ title: "Title, slug, and content are required", variant: "destructive" });
      return;
    }

    const postData = {
      title: postFormData.title,
      slug: postFormData.slug,
      excerpt: postFormData.excerpt || null,
      content: postFormData.content,
      cover_image: postFormData.cover_image || null,
      published: postFormData.published,
      author_id: user?.id,
    };

    if (editingPost) {
      const { error } = await supabase
        .from("blog_posts")
        .update(postData)
        .eq("id", editingPost.id);
      
      if (error) {
        toast({ title: "Error updating post", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Post updated!" });
        resetPostForm();
        fetchPosts();
      }
    } else {
      const { error } = await supabase
        .from("blog_posts")
        .insert([postData]);
      
      if (error) {
        if (error.message.includes("duplicate")) {
          toast({ title: "Slug already exists", description: "Please use a unique slug", variant: "destructive" });
        } else {
          toast({ title: "Error creating post", description: error.message, variant: "destructive" });
        }
      } else {
        toast({ title: "Post created!" });
        resetPostForm();
        fetchPosts();
      }
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      cover_image: post.cover_image || "",
      published: post.published,
    });
    setIsEditingPost(true);
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({ title: "Error deleting post", variant: "destructive" });
    } else {
      toast({ title: "Post deleted" });
      fetchPosts();
    }
  };

  const togglePostPublished = async (id: string, published: boolean) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ published: !published })
      .eq("id", id);
    
    if (error) {
      toast({ title: "Error updating post", variant: "destructive" });
    } else {
      fetchPosts();
    }
  };

  const resetPostForm = () => {
    setIsEditingPost(false);
    setEditingPost(null);
    setPostFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      cover_image: "",
      published: false,
    });
  };

  // Projects functions
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    
    if (error) {
      toast({ title: "Error fetching projects", variant: "destructive" });
    } else {
      setProjects(data || []);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectFormData.title) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }

    const projectData = {
      title: projectFormData.title,
      description: projectFormData.description || null,
      image_url: projectFormData.image_url || null,
      tech_stack: projectFormData.tech_stack.split(",").map(s => s.trim()).filter(Boolean),
      live_url: projectFormData.live_url || null,
      github_url: projectFormData.github_url || null,
      featured: projectFormData.featured,
      revenue: projectFormData.revenue || null,
      users_count: projectFormData.users_count || null,
      sort_order: projectFormData.sort_order,
    };

    if (editingProject) {
      const { error } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", editingProject.id);
      
      if (error) {
        toast({ title: "Error updating project", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Project updated!" });
        resetProjectForm();
        fetchProjects();
      }
    } else {
      const { error } = await supabase
        .from("projects")
        .insert([projectData]);
      
      if (error) {
        toast({ title: "Error creating project", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Project created!" });
        resetProjectForm();
        fetchProjects();
      }
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectFormData({
      title: project.title,
      description: project.description || "",
      image_url: project.image_url || "",
      tech_stack: project.tech_stack?.join(", ") || "",
      live_url: project.live_url || "",
      github_url: project.github_url || "",
      featured: project.featured,
      revenue: project.revenue || "",
      users_count: project.users_count || "",
      sort_order: project.sort_order,
    });
    setIsEditingProject(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);
    
    if (error) {
      toast({ title: "Error deleting project", variant: "destructive" });
    } else {
      toast({ title: "Project deleted" });
      fetchProjects();
    }
  };

  const toggleProjectFeatured = async (id: string, featured: boolean) => {
    const { error } = await supabase
      .from("projects")
      .update({ featured: !featured })
      .eq("id", id);
    
    if (error) {
      toast({ title: "Error updating project", variant: "destructive" });
    } else {
      fetchProjects();
    }
  };

  const resetProjectForm = () => {
    setIsEditingProject(false);
    setEditingProject(null);
    setProjectFormData({
      title: "",
      description: "",
      image_url: "",
      tech_stack: "",
      live_url: "",
      github_url: "",
      featured: false,
      revenue: "",
      users_count: "",
      sort_order: 0,
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-mono mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You don't have admin privileges.</p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="/" className="font-mono font-bold text-xl">
              <span className="text-gradient">mikhail.dev</span>
            </a>
            <span className="text-muted-foreground">/</span>
            <span className="font-mono text-sm">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="posts">Blog Posts ({posts.length})</TabsTrigger>
            <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
          </TabsList>

          {/* Blog Posts Tab */}
          <TabsContent value="posts">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Post Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-1"
              >
                <div className="rounded-xl border border-border bg-card p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold font-mono">
                      {editingPost ? "Edit Post" : "New Post"}
                    </h2>
                    {isEditingPost && (
                      <Button variant="ghost" size="sm" onClick={resetPostForm}>
                        Cancel
                      </Button>
                    )}
                  </div>

                  <form onSubmit={handlePostSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="post-title">Title</Label>
                      <Input
                        id="post-title"
                        value={postFormData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Post title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="post-slug">Slug</Label>
                      <Input
                        id="post-slug"
                        value={postFormData.slug}
                        onChange={(e) => setPostFormData({ ...postFormData, slug: e.target.value })}
                        placeholder="post-url-slug"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="post-excerpt">Excerpt</Label>
                      <Textarea
                        id="post-excerpt"
                        value={postFormData.excerpt}
                        onChange={(e) => setPostFormData({ ...postFormData, excerpt: e.target.value })}
                        placeholder="Brief description..."
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="post-content">Content</Label>
                      <Textarea
                        id="post-content"
                        value={postFormData.content}
                        onChange={(e) => setPostFormData({ ...postFormData, content: e.target.value })}
                        placeholder="Write your post..."
                        rows={8}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="post-cover">Cover Image URL</Label>
                      <Input
                        id="post-cover"
                        value={postFormData.cover_image}
                        onChange={(e) => setPostFormData({ ...postFormData, cover_image: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="post-published">Publish immediately</Label>
                      <Switch
                        id="post-published"
                        checked={postFormData.published}
                        onCheckedChange={(checked) => setPostFormData({ ...postFormData, published: checked })}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      {editingPost ? "Update Post" : "Create Post"}
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Posts List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                <h2 className="text-xl font-bold font-mono mb-6">All Posts</h2>

                {posts.length === 0 ? (
                  <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
                    <p className="text-muted-foreground">No posts yet. Create your first one!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="rounded-xl border border-border bg-card/50 p-6 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              {post.published ? (
                                <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-green-500/20 text-green-500">
                                  Published
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-yellow-500/20 text-yellow-500">
                                  Draft
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold font-mono text-lg truncate">{post.title}</h3>
                            <p className="text-sm text-muted-foreground truncate">/{post.slug}</p>
                            {post.excerpt && (
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {post.excerpt}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => togglePostPublished(post.id, post.published)}
                              title={post.published ? "Unpublish" : "Publish"}
                            >
                              {post.published ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditPost(post)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePost(post.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Project Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-1"
              >
                <div className="rounded-xl border border-border bg-card p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold font-mono">
                      {editingProject ? "Edit Project" : "New Project"}
                    </h2>
                    {isEditingProject && (
                      <Button variant="ghost" size="sm" onClick={resetProjectForm}>
                        Cancel
                      </Button>
                    )}
                  </div>

                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-title">Title</Label>
                      <Input
                        id="project-title"
                        value={projectFormData.title}
                        onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                        placeholder="Project name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project-description">Description</Label>
                      <Textarea
                        id="project-description"
                        value={projectFormData.description}
                        onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                        placeholder="Brief description..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project-tech">Tech Stack (comma separated)</Label>
                      <Input
                        id="project-tech"
                        value={projectFormData.tech_stack}
                        onChange={(e) => setProjectFormData({ ...projectFormData, tech_stack: e.target.value })}
                        placeholder="React, TypeScript, Supabase"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="project-revenue">Revenue</Label>
                        <Input
                          id="project-revenue"
                          value={projectFormData.revenue}
                          onChange={(e) => setProjectFormData({ ...projectFormData, revenue: e.target.value })}
                          placeholder="$5k/mo"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="project-users">Users</Label>
                        <Input
                          id="project-users"
                          value={projectFormData.users_count}
                          onChange={(e) => setProjectFormData({ ...projectFormData, users_count: e.target.value })}
                          placeholder="1.2k"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project-live">Live URL</Label>
                      <Input
                        id="project-live"
                        value={projectFormData.live_url}
                        onChange={(e) => setProjectFormData({ ...projectFormData, live_url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project-github">GitHub URL</Label>
                      <Input
                        id="project-github"
                        value={projectFormData.github_url}
                        onChange={(e) => setProjectFormData({ ...projectFormData, github_url: e.target.value })}
                        placeholder="https://github.com/..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project-image">Image URL</Label>
                      <Input
                        id="project-image"
                        value={projectFormData.image_url}
                        onChange={(e) => setProjectFormData({ ...projectFormData, image_url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project-order">Sort Order</Label>
                      <Input
                        id="project-order"
                        type="number"
                        value={projectFormData.sort_order}
                        onChange={(e) => setProjectFormData({ ...projectFormData, sort_order: parseInt(e.target.value) || 0 })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="project-featured">Featured</Label>
                      <Switch
                        id="project-featured"
                        checked={projectFormData.featured}
                        onCheckedChange={(checked) => setProjectFormData({ ...projectFormData, featured: checked })}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      {editingProject ? "Update Project" : "Create Project"}
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Projects List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                <h2 className="text-xl font-bold font-mono mb-6">All Projects</h2>

                {projects.length === 0 ? (
                  <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
                    <p className="text-muted-foreground">No projects yet. Create your first one!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="rounded-xl border border-border bg-card/50 p-6 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              {project.featured && (
                                <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-primary/20 text-primary">
                                  Featured
                                </span>
                              )}
                              {project.revenue && (
                                <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-green-500/20 text-green-500">
                                  {project.revenue}
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold font-mono text-lg">{project.title}</h3>
                            {project.description && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {project.description}
                              </p>
                            )}
                            {project.tech_stack && project.tech_stack.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {project.tech_stack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-0.5 rounded text-xs font-mono bg-secondary"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleProjectFeatured(project.id, project.featured)}
                              title={project.featured ? "Unfeature" : "Feature"}
                            >
                              {project.featured ? (
                                <StarOff className="w-4 h-4" />
                              ) : (
                                <Star className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditProject(project)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteProject(project.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;