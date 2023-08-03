'use client'

import PageBar from "./pageBar/pageBar";
import styles from "./page.module.scss";
import VerticalBar from "./verticalBar/verticalBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="styles.main">
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <VerticalBar />
          <div className="col px-0">
            <PageBar page={"Home"}/>
            <div className="p-4">
              Content area...
              <hr />
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}