export default class NavigationUtil {
  /**
   * 重置到首页
   * @params params
   * */
  static resetToHomePage(params) {
    const {navigation} = params
    navigation.navigate("Main")
  }
  
  /**
   * 跳转到指定页面
   * @param params 要传递的参数
   * @param page 要跳转的页面名（页面路由）
   * */
  static goPage(params,page){
    const navigation = NavigationUtil.navigation
    if(!navigation){
      console.log("NavigationUtil.navigation can not be null")
    }
    navigation.navigate(
      page,{...params}
    )
  }
}