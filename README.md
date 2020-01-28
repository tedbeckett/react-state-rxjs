# react-rxjs-state-management-hoc-example

Use RxJS and Hooks to manage state in a React app.


## Details

BehaviorSubjects are used to hold data pushed from the server because they retain and make available the last item written to the stream. This allows components created after the data has been received from the server to access the last provided value. BehaviorSubjects also allow default values provided at initialization. This works nicely when the data is a collection because the  haviorSubject can be initialized with an empty collection. This alleviates timing  issues when components are created before server data has arrived because they  eceive an empty collection at first and then later recieve actual data as it arrives.

## Installation

* cd react-rxjs-state-management-hoc-example
* npm install
* cd server
* npm run dev
* visit `http://localhost:3000`
