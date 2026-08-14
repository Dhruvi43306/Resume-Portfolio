"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const MESSAGE_URL = "https://resume-portfolio-backend-d7qr.onrender.com/api/messages";
interface Message {
  messageId: number;
  userId: number;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminInboxPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [editError, setEditError] = useState("");

  useEffect(() => {
    const roleId = localStorage.getItem("roleId");
    if (roleId !== "1") {
      router.replace("/");
      return;
    }

    fetchMessages();
  }, [router]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const token = localStorage.getItem("token");

      const response = await fetch(MESSAGE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      let result: any = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.Message ||
            "Unable to fetch messages."
        );
      }

      setMessages(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Fetch messages error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while loading messages."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Message) => {
    setEditingMessage(item);
    setFormData({
      fullName: item.fullName || "",
      email: item.email || "",
      subject: item.subject || "",
      message: item.message || "",
    });
    setEditError("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditApi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMessage) return;

    try {
      setIsUpdating(true);
      setEditError("");
      const token = localStorage.getItem("token");

      const response = await fetch(`${MESSAGE_URL}/${editingMessage.messageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

     

      if (!response.ok) {
        throw new Error(
          "Failed to update message."
        );
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === editingMessage.messageId
            ? { ...msg, ...formData }
            : msg
        )
      );

      setEditingMessage(null);

      Swal.fire({
        title: "Updated!",
        text: "The message has been updated successfully.",
        icon: "success",
        confirmButtonColor: "#06b6d4",
        background: "#0b1528",
        color: "#f8fafc",
      });
    } catch (error) {
      console.error("Edit message error:", error);
      setEditError(
        error instanceof Error ? error.message : "Error updating message."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (messageId: number) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this message? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#334155",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#0b1528",
      color: "#f8fafc",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${MESSAGE_URL}/${messageId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

    
      if (!response.ok) {
        throw new Error(
          "Failed to delete message."
        );
      }

      setMessages((prev) => prev.filter((msg) => msg.messageId !== messageId));

      Swal.fire({
        title: "Deleted!",
        text: "The message has been deleted.",
        icon: "success",
        confirmButtonColor: "#06b6d4",
        background: "#0b1528",
        color: "#f8fafc",
      });
    } catch (error) {
      console.error("Delete message error:", error);

      Swal.fire({
        title: "Error!",
        text: error instanceof Error ? error.message : "Failed to delete message.",
        icon: "error",
        confirmButtonColor: "#06b6d4",
        background: "#0b1528",
        color: "#f8fafc",
      });
    }
  };

  const formatTime = (createdAt: string) => {
    if (!createdAt) {
      return "";
    }

    const date = new Date(createdAt);

    if (Number.isNaN(date.getTime())) {
      return createdAt;
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#03070f] relative overflow-hidden flex items-center justify-center p-6">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-700/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full bg-[#0b1528]/70 backdrop-blur-xl p-8 rounded-3xl border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-cyan-500/15">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black bg-gradient-to-r from-cyan-300 via-teal-200 to-blue-400 bg-clip-text text-transparent tracking-tight">
              Admin Inbox
            </h2>
            <span className="bg-cyan-950/80 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              {messages.length}
            </span>
          </div>
          <span className="text-xs font-semibold text-cyan-400/60 uppercase tracking-widest">
            Live Preview
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/40 border border-cyan-500/10 rounded-2xl">
              <div className="h-4 w-40 bg-cyan-500/10 rounded animate-pulse mb-3" />
              <div className="h-3 w-56 bg-cyan-500/10 rounded animate-pulse mb-5" />
              <div className="h-20 w-full bg-cyan-500/10 rounded-xl animate-pulse" />
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && errorMessage && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        {!loading && !errorMessage && (
          <div className="space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-slate-400 text-sm">
                  No messages received yet.
                </p>
              </div>
            ) : (
              messages.map((item) => (
                <div
                  key={item.messageId}
                  className="group relative p-6 bg-slate-900/40 hover:bg-slate-900/60 border border-cyan-500/10 hover:border-cyan-400/30 rounded-2xl space-y-4 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-200 transition-colors">
                          {item.fullName}
                        </h3>
                      </div>
                      <p className="text-xs font-mono font-medium text-cyan-400/90">
                        {item.email}
                      </p>
                      <p className="text-xs font-semibold text-teal-300 pt-1">
                        {item.subject}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs font-medium text-cyan-300/60 bg-cyan-950/40 px-3 py-1 rounded-lg border border-cyan-500/20 whitespace-nowrap">
                        {formatTime(item.createdAt)}
                      </span>

                      {/* Edit & Delete Action Icons */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1.5 rounded-lg text-cyan-400/80 hover:text-cyan-200 hover:bg-cyan-500/20 transition-all duration-200"
                          title="Edit Message"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item.messageId)}
                          className="p-1.5 rounded-lg text-red-400/80 hover:text-red-300 hover:bg-red-500/20 transition-all duration-200"
                          title="Delete Message"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#050b14]/60 p-4 rounded-xl border border-cyan-500/10 text-sm text-slate-300 leading-relaxed backdrop-blur-sm">
                    {item.message}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Edit Form Modal */}
      {editingMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0b1528] border border-cyan-500/30 p-6 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.25)] space-y-5">
            <div className="flex justify-between items-center border-b border-cyan-500/20 pb-3">
              <h3 className="text-lg font-bold text-cyan-200">Edit Message</h3>
              <button
                onClick={() => setEditingMessage(null)}
                className="text-slate-400 hover:text-slate-100 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            {editError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {editError}
              </div>
            )}

            <form onSubmit={handleEditApi} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-900/80 border border-cyan-500/20 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-900/80 border border-cyan-500/20 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-900/80 border border-cyan-500/20 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full bg-slate-900/80 border border-cyan-500/20 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingMessage(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}