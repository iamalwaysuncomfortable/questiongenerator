export const ADD_QUESTION = 'ADD_TODO';
export const SUBMIT_QUESTIONS_ = 'SUBMIT_QUESTIONS';
export const EDIT_QUESTION = 'REMOVE_QUESTION';

/*
 * other constants
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addQuestion(text) {
    return { type: ADD_TODO, text }
}

export function toggleTod(index) {
    return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}
