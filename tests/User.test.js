import Chai from "chai"
import ChaiHTTP from "chai-http"
import {describe, it as test} from "mocha"
import StatusCode from "../configuration/StatusCode.js"
import app from "../Server.js"

Chai.should()
Chai.use(ChaiHTTP)

const randomString = Math.random().toString(36).substring(7)

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

describe("TESTING THE USER_API ROUTE", () => {
    testingNonExistingRoute()

})