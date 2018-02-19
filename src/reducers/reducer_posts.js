import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST } from "../actions";

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            // [ post1, post2 ] -> { 1: post1 },{ 2: post2 }
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_POST:
            // const post = action.payload.data;
            // const newState = { ...state };
            // newState[post.id] = post;
            // return newState;

            return { ...state, [action.payload.data.id]: action.payload.data };
        default:
            return action;
    }
}