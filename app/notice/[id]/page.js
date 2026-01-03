"use client";

import PostDetailLayout from "@/app/component/PostDetailLayout";

export default function NoticeDetail({ params }) {
  const { id } = params;

  return (
    <PostDetailLayout
      collection="posts"
      id={id}
      redirectPath="/notice"
      isNoticeStyle={true}
    />
  );
}
