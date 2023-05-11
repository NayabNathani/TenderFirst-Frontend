import React from 'react'
import { Form, Button, Card } from 'react-bootstrap'

const DetailCompo = () => {

    return (
        <>
            <div className="row gy-4">
                <div className="col-lg-8">
                    <div>
                        {/* <!-- ======= Portfolio Details Section ======= --> */}
                        <section id="portfolio-details" className="portfolio-details">
                            <div className="container">

                                <div className="row gy-4">

                                    {/* <div class="col-lg-8">
                          <div class="portfolio-details-slider swiper">
                              <div class="swiper-wrapper align-items-center">

                                  <div class="swiper-slide">
                                      <img src="assets/img/portfolio/portfolio-1.jpg" alt=""/>
                                  </div>

                                  <div class="swiper-slide">
                                      <img src="assets/img/portfolio/portfolio-2.jpg" alt=""/>
                                  </div>

                                  <div class="swiper-slide">
                                      <img src="assets/img/portfolio/portfolio-3.jpg" alt=""/>
                                  </div>

                              </div>
                              <div class="swiper-pagination"></div>
                          </div>
                      </div> */}

                                    <div className="col-lg-12">
                                        <div className="portfolio-info">
                                            <h3>Project information</h3>
                                            <ul>
                                                <li><strong>Category</strong>: Web design</li>
                                                <li><strong>Client</strong>: ASU Company</li>
                                                <li><strong>Project date</strong>: 01 March, 2020</li>
                                                <li><strong>Project URL</strong>: <a href="#">www.example.com</a></li>
                                            </ul>
                                        </div>
                                        <div className="portfolio-description">
                                            <h2>This is an example of portfolio detail</h2>
                                            <p>
                                                Autem ipsum nam porro corporis rerum. Quis eos dolorem eos itaque inventore commodi labore quia quia. Exercitationem repudiandae officiis neque suscipit non officia eaque itaque enim. Voluptatem officia accusantium nesciunt est omnis tempora consectetur dignissimos. Sequi nulla at esse enim cum deserunt eius.
                                            </p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </section>
                    </div></div>

                <div className="col-lg-4" style={{marginTop:"auto"}}>
                    <Card>
                        <Card.Body>
                            <Card.Title className='text-center'>Place Your Bid</Card.Title>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Bid Amount</Form.Label>
                                    <Form.Control type="number" placeholder="Enter your bid amount" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit Bid
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default DetailCompo