import React from 'react'

export const fetchCategoryData = () => {
}

export default async function Page({
  params,
}: {
  params: { id: string }
}) {
    const slug = (await params).id
  console.log(slug)
  
  return (
    <div>page</div>
  )
}