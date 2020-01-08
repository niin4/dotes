import { observable } from "mobx";

class RootStore {
    @observable
    user = {};
}

export default RootStore;