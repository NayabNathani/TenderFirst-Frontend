import React from 'react'

function breadcrumb() {
  return (
    <>
    <main id="main">
        {/* <!-- ======= Breadcrumbs ======= --> */}
    <section class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2>Inner Page</h2>
          <ol>
            <li><a href="index.html">HomePage</a></li>
            <li>Next Page</li>
          </ol>
        </div>

      </div>
    </section>
    {/* <!-- End Breadcrumbs --> */}

    <section class="inner-page">
      <div class="container">
        <p>
          Example inner page template
        </p>
      </div>
    </section>

  </main>
    </>

  )
}

export default breadcrumb
