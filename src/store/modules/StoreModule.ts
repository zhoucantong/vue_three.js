import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators"
import * as aTypes from "@/store/ActionTypes"
import * as mTypes from "@/store/MutationTypes"

@Module
export default class StoreModule extends VuexModule {
  test = false

  @Mutation
  [mTypes.MUTATION]() {
    this.test = true
  }

  @Action
  [aTypes.ACTION](){
    this.context.commit(mTypes.MUTATION)
  }
}
