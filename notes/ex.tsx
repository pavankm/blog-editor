import React, { useState } from "react";
import { PenTool, FileText, Upload, Check, Edit3, Github } from "lucide-react";
import "./ex.css";

export default function BlogAppUI() {
  const [screen, setScreen] = useState("canvas");

  const posts = [
    { title: "Stillness in Motion", date: "2025-10-15", status: "published" },
    { title: "Cherry Blossoms at Dawn", date: "2025-10-12", status: "draft" },
    { title: "The Art of Tea", date: "2025-10-10", status: "published" },
  ];

  return (
    <div className="blog-app">
      {/* Minimal Top Border */}
      <div className="top-border"></div>

      {/* Screen Selector */}
      <div className="screen-selector">
        <div className="screen-selector-content">
          <button
            onClick={() => setScreen("canvas")}
            className={`screen-button ${screen === "canvas" ? "active" : ""}`}
          >
            書く
          </button>
          <button
            onClick={() => setScreen("preview")}
            className={`screen-button ${screen === "preview" ? "active" : ""}`}
          >
            Preview
          </button>
          <button
            onClick={() => setScreen("posts")}
            className={`screen-button ${screen === "posts" ? "active" : ""}`}
          >
            Posts
          </button>
          <button
            onClick={() => setScreen("settings")}
            className={`screen-button ${screen === "settings" ? "active" : ""}`}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Canvas Screen */}
      {screen === "canvas" && (
        <div className="screen">
          {/* Minimal Top Bar */}
          <div className="top-bar">
            <div className="top-bar-content">
              <div className="top-bar-left">
                <div className="status-dot"></div>
                <h1 className="screen-title">New Composition</h1>
              </div>

              <div className="top-bar-right">
                <button className="button button-secondary">
                  <FileText className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <button className="button button-primary">
                  <Upload className="w-4 h-4" />
                  <span>Publish</span>
                </button>
              </div>
            </div>
          </div>

          {/* Canvas Area with Washi Paper Texture */}
          <div className="canvas-area">
            <div className="canvas">
              {/* Subtle Texture Overlay */}
              <div
                className="texture-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
                }}
              ></div>

              <div className="canvas-placeholder">
                <div className="canvas-placeholder-content">
                  <div className="placeholder-icon-container">
                    <PenTool className="placeholder-icon" strokeWidth={1.5} />
                  </div>
                  <p className="placeholder-text">Begin your story</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Minimalist Toolbar */}
          <div className="bottom-toolbar">
            <div className="toolbar-content">
              <div className="toolbar-left">
                <button className="tool-button">
                  <Edit3 className="tool-icon" strokeWidth={1.5} />
                </button>
                <div className="divider"></div>
                <div className="brush-options">
                  <span className="brush-label">Brush</span>
                  <div className="brush-sizes">
                    <button className="brush-size-button selected">
                      <div
                        className="brush-dot"
                        style={{ width: "0.25rem", height: "0.25rem" }}
                      ></div>
                    </button>
                    <button className="brush-size-button unselected">
                      <div
                        className="brush-dot"
                        style={{ width: "0.375rem", height: "0.375rem" }}
                      ></div>
                    </button>
                    <button className="brush-size-button unselected">
                      <div
                        className="brush-dot"
                        style={{ width: "0.625rem", height: "0.625rem" }}
                      ></div>
                    </button>
                  </div>
                </div>
              </div>

              <button className="clear-button">Clear</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Screen */}
      {screen === "preview" && (
        <div className="screen">
          <div className="top-bar">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <h1 className="screen-title">Refine & Publish</h1>
              <div className="top-bar-right">
                <button className="button button-secondary">Back</button>
                <button className="button button-primary">
                  <Upload className="w-4 h-4" />
                  <span>Publish</span>
                </button>
              </div>
            </div>
          </div>

          <div className="content-area">
            <div className="content">
              {/* Metadata */}
              <div className="card">
                <h2 className="card-header">
                  <div
                    className="status-dot"
                    style={{ backgroundColor: "#fecaca" }}
                  ></div>
                  Details
                </h2>
                <div className="space-y-5">
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      placeholder="Enter your title..."
                      className="form-input"
                    />
                  </div>
                  <div className="grid-2-col">
                    <div className="form-group">
                      <label className="form-label">Date</label>
                      <input type="date" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <input
                        type="text"
                        placeholder="Reflection, Journey..."
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tags</label>
                    <input
                      type="text"
                      placeholder="peace, nature, mindfulness"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Content Editor */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="card-header" style={{ marginBottom: 0 }}>
                    <div
                      className="status-dot"
                      style={{ backgroundColor: "#fde047" }}
                    ></div>
                    Content
                  </h2>
                  <button className="text-sm text-stone-500 hover:text-stone-700 font-light tracking-wide transition-all">
                    Re-scan
                  </button>
                </div>
                <textarea
                  className="textarea"
                  placeholder="Your words will appear here..."
                  defaultValue="# The Path of Stillness

In the quiet morning, before the world awakens, there exists a moment of pure presence.

## Finding Peace

The gentle rustle of leaves carries wisdom that words cannot express. In simplicity, we find depth."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts List */}
      {screen === "posts" && (
        <div className="screen">
          <div className="top-bar">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <h1 className="screen-title">Archive</h1>
              <button className="button button-primary">
                <PenTool className="w-4 h-4" />
                <span>New</span>
              </button>
            </div>
          </div>

          <div className="content-area">
            <div className="post-list">
              {posts.map((post, idx) => (
                <div key={idx} className="post-item">
                  <div className="post-item-content">
                    <div className="post-details">
                      <div className="post-title-container">
                        <div className={`post-status-dot ${post.status}`}></div>
                        <h3 className="post-title">{post.title}</h3>
                      </div>
                      <p className="post-date">{post.date}</p>
                    </div>
                    <button className="edit-button">
                      <Edit3 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings */}
      {screen === "settings" && (
        <div className="screen">
          <div className="top-bar">
            <div className="max-w-4xl mx-auto">
              <h1 className="screen-title">Configuration</h1>
            </div>
          </div>

          <div className="content-area">
            <div className="settings-content">
              {/* GitHub */}
              <div className="card">
                <div className="flex items-center gap-3 mb-6">
                  <Github className="github-icon" strokeWidth={1.5} />
                  <h2 className="card-header" style={{ marginBottom: 0 }}>
                    GitHub
                  </h2>
                </div>
                <div className="space-y-5">
                  <div className="form-group">
                    <label className="form-label">Repository</label>
                    <input
                      type="text"
                      placeholder="username/repository"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Access Token</label>
                    <input
                      type="password"
                      placeholder="ghp_xxxxxxxxxxxx"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Posts Path</label>
                    <input
                      type="text"
                      placeholder="_posts"
                      className="form-input"
                    />
                  </div>
                  <button className="button button-primary verify-button">
                    <Check className="w-4 h-4" />
                    <span>Verify Connection</span>
                  </button>
                </div>
              </div>

              {/* Recognition */}
              <div className="card">
                <h2 className="card-header">
                  <div
                    className="status-dot"
                    style={{ backgroundColor: "#fecaca" }}
                  ></div>
                  Recognition
                </h2>
                <div className="space-y-5">
                  <div className="toggle-group">
                    <div className="toggle-label">
                      <p>Detect headers</p>
                      <p>Convert large text to markdown headings</p>
                    </div>
                    <button className="toggle-button">
                      <div className="toggle-indicator"></div>
                    </button>
                  </div>
                  <div
                    className="toggle-group"
                    style={{ borderBottom: "none" }}
                  >
                    <div className="toggle-label">
                      <p>Detect lists</p>
                      <p>Transform bullets to markdown format</p>
                    </div>
                    <button className="toggle-button">
                      <div className="toggle-indicator"></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="card about-card">
                <div className="about-icon-container">
                  <PenTool className="about-icon" strokeWidth={1.5} />
                </div>
                <p className="app-name">静寂 - Seijaku</p>
                <p className="app-version">Version 1.0</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
