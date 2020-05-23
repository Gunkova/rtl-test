// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware]

const mockStore = configureStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

function wait(ms?: number) {
    return new Promise(resolve => setTimeout(resolve, ms || 0));
}

export { mockStore, wait };
