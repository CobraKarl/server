import Chai from "chai"
import ChaiHTTP from "chai-http"
import { response } from "express"
import {describe, it as test} from "mocha"
import StatusCode from "../configuration/StatusCode.js"
import app from "../Server.js"

Chai.should()
Chai.use(ChaiHTTP)

const randomString = Math.random().toString(36).substring(7)
const userId ="61f7a8ae69509674e69fd75e"
const user = {
    username: randomString,
    password: randomString, 
}

const testingNonExistingRoute = () => {
    describe("Testing a route that not exist", () => {
        test("Expecting 404 not found", (done) => {
            Chai.request(app)
            .get(`/${randomString}`)
            .end((request, respons) => {
                respons.should.have.a.status(StatusCode.NOT_FOUND)
                done()
            })
        })

    })
}

const creatUser = () => {
    describe("Testing CREATE(POST) method for user entity", () =>{ 
        test ("Expecting a user to be created", (done) => {
            Chai.request(app)
                .post("/user")
                .send(user)
                .end ((error, respons) => {
                    respons.should.have.a.status(StatusCode.CREATED)
                    respons.body.should.be.a("object")
                    respons.body.should.have.property("username").eq(user.username)
                    respons.body.should.have.property("password").eq(user.password)
                    done()

                })
        })

    })

}

const getAllUsers = () => {
    describe("Fetching all users(GET)", () => {
        test ("Expecting to return all the users", (done) => {
            Chai.request(app)
                .get("/user")
                .end((error, respons) => {
                respons.should.have.status(StatusCode.OK)
                respons.body.should.be.a("array")
                respons.body.length.should.be.eq(respons.body.length)
                done()
            })
        })

    })
}
const updateUser = () => {
    describe("Updating(PUT) a user in the database", () =>{
        test ("Expecting a user to be updated", (done) =>{
            Chai.request(app)
                .put(`/user/${userId}`)
                .send(user)
                .end((error, respons) => {
                    respons.should.have.status(StatusCode.OK)
                    respons.body.should.be.a("object")
                    respons.body.should.have.property("_id").eq(userId)
                    respons.body.should.have.property("username").eq(user.username)
                    respons.body.should.have.property("password").eq(user.password)
                    done()
                })

        })

    })


}
const deleteUser = () => {
    describe("Deleting(DELETE) a user in the database", () =>{
        test ("Expecting a user to be deleted", (done =>{
            Chai.request(app)
                .delete(`/user/${userId}`)
                .end((error, respons) => {
                    respons.should.have.status(StatusCode.OK)
                    done()
                

            })
        }))

    })


}


describe("TESTING THE USER_API ROUTE", () => {
    testingNonExistingRoute()
    creatUser()
    getAllUsers()
    updateUser()
    deleteUser()

})