/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-18 03:01:16
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-18 03:41:14
 * @Description :
 */
import React from 'react'
import styled from 'styled-components'

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 21rem;
  /* height: 35rem; */
  /* border: 1px solid #ddd; */
  box-shadow: 0 0 10px 1px #ddd;
  padding: 1.2rem;
`
const ViewHeader = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
`
const ViewBody = styled.div`
 flex: 1;
`
const ViewFooter = styled.div``

export interface ViewLayoutProps {
  header: { left: React.ReactNode; middle: React.ReactNode; right: React.ReactNode }
  body: React.ReactNode
  footer: React.ReactNode
}

export default function ViewLayout(props: ViewLayoutProps) {
  const { header, body, footer } = props
  return (
    <ViewContainer>
      <ViewHeader>
        <div>{header.left}</div>
        <div>{header.middle}</div>
        <div>{header.right}</div>
      </ViewHeader>
      <ViewBody>{body}</ViewBody>
      <ViewFooter>{footer}</ViewFooter>
    </ViewContainer>
  )
}
