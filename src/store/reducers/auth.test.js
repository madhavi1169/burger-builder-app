import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth render", () => {
  it("should return  the intial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
  it("should store   the token when login ", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some token",
          userId: "some userid",
        }
      )
    ).toEqual({
      token: "some token",
      userId: "some userid",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
