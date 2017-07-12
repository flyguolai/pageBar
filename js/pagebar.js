app.directive("pagebar",function(){
    return {
        restrict:"AE",
        //template: '<div>Hi there</div>',
        templateUrl:"./template/pagebar.html",
        replace:true,
        scope:{
            startPage:"=startpage",
            endPage:"=endpage",
            clickCBK:"&clickcbk"
        },
        controller:function($scope){
            $scope.startPageFlag=false;
            $scope.endPageFlag=false;
            $scope.prevFlag=false;
            $scope.nextFlag= false;
            $scope.startPage= 1;
            $scope.endPage= 20;
            $scope.currentPage=1;
            //回调在默认情况下显示没有回调函数，回调函数用于显示
            $scope.clickCBK=function(){
                console.warn("no click event is bind")
            },
            //$scope.PageNumArray=["1","2","3","4","5"];

            //监听 currentPage 如果发生变化就刷新（其实是点击就更新）
            $scope.$watch("currentPage",function(){
                $scope.startPageFlag=false;
                $scope.endPageFlag=false;
                $scope.prevFlag=false;
                $scope.nextFlag= false;
                $scope.PageNumArray = [];
                $scope.setPageNumArray($scope.currentPage)

                if(parseInt($scope.currentPage) >= parseInt($scope.startPage) + 3){
                    $scope.startPageFlag = true;
                    if($scope.currentPage == parseInt($scope.startPage) + 3){
                        $scope.prevFlag = false;
                    }else{
                        $scope.prevFlag = true;
                    }
                    
                }

                if(parseInt($scope.currentPage) <= parseInt($scope.endPage) - 3 ){
                    $scope.endPageFlag = true;
                    if($scope.currentPage == parseInt($scope.endPage) -3){
                        $scope.nextFlag = false;
                    }else{
                        $scope.nextFlag = true;
                    }
                    
                }
                
            })
            //设置显示的那五个数字，就是中间的五个
            $scope.setPageNumArray = function(currentPage){
                var start = parseInt(currentPage) - 2 < $scope.startPage?$scope.startPage:parseInt($scope.currentPage) - 2;
                var end = parseInt(currentPage) + 2 > $scope.endPage? $scope.endPage:parseInt($scope.currentPage) + 2;
                for(var i = start ; i <= end ; i++){
                    $scope.PageNumArray.push(i.toString())
                }
            }
            //初始化函数，目前不需要，建议写在link中
            $scope.initPageBar = function(){

            }
            //设置currentPage
            $scope.setCurPage = function(page){
                $scope.currentPage = page;
            }
            //前翻一页，仅仅做了接口，没有做界面
            $scope.GoPrev = function(){
                if($scope.prevFlag == false) return;
                if($scope.currentPage <= $scope.startPage){
                    $scope.currentPage = 1;
                }else{
                    $scope.currentPage = $scope.currentPage - 1;
                }
            }
            //后翻一页，仅仅做了接口，没做界面
            $scope.GoNext = function(){
                if($scope.nextFlag == false) return;
                if($scope.currentPage >= $scope.endPage){
                    $scope.currentPage = $scope.endPage;
                }else{
                    $scope.currentPage = $scope.currentPage + 1;
                }
            }
            //设置前翻一页的显示flag，ngif判断
            $scope.setPrevFlag = function(flag){
                // if no value set prevFlag to false
                $scope.prevFlag = flag || false;
            }
            //设置后翻一页的显示flag，ngif判断
            $scope.setNextFlag = function(flag){
                // if no value set nextFlag to false
                $scope.nextFlag = flag || false;
            }
            //点击事件，并将回调引入
            $scope.clickevt = function(page){
                console.log(page)
                $scope.currentPage = page;
                $scope.clickCBK();
            }

            
        },
        link:function($scope){
            $scope.initPageBar();
        }
    }
})