"use client";

import PostDetailLayout from "@/app/component/PostDetailLayout";

export default function LampDetail({ params }) {
  const { id } = params;

  return <PostDetailLayout collection="posts" id={id} redirectPath="/lamp" />;
}
