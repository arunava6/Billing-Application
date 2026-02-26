import React from 'react'

const Userform = () => {
  return (
            <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-10 col-md-12 col-sm-12">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            {/* <h3 className="card-title text-center mb-4">Add Category</h3> */}
                            <form id="registrationForm">

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="johndoe@gmail.com"
                                        required
                                    />
                                </div>
                               <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-warning w-100">Save</button>
                                    <div id="formFeedback" className="mt-3"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Userform