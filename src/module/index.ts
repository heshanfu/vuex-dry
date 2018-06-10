import BuildConfig from "./build_config";
import buildState from "./state_builder";
import buildGetters from "./getters_builder";
import buildMutations from "./mutations_builder";
import buildActions from "./actions_builder";
import defaultGetters from "./default_getters";
import defaultMutations from "./default_mutations";
import { Module as VuexModuleType } from "vuex";

const Module = {
  build(buildConfig: BuildConfig): VuexModuleType<any, any> {
    const initialState = buildConfig.data();
    return {
      namespaced: true,
      state: buildState(buildConfig),
      getters: {
        ...defaultGetters(initialState),
        ...buildGetters(buildConfig),
        ...buildConfig.getters
      },
      mutations: {
        ...defaultMutations(initialState),
        ...buildMutations(buildConfig),
        ...buildConfig.mutations
      },
      actions: {
        ...buildActions(buildConfig),
        ...buildConfig.actions
      }
    };
  }
};

export default Module;