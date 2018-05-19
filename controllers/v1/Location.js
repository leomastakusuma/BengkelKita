import {action, get} from "../../library/Abstract"
export default class Location {
    @action('post', '/foo')
   foo(req, res) {
      res.json('bar');
   }
}