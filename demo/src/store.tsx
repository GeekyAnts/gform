import {observable} from 'mobx';

class Store {
  @observable values = {name: 'shakthi'};
}

export default new Store();
