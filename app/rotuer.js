angular.module('Chest').config(function ($stateProvider, $urlRouterProvider, CONFIG, AuthService) {

  $urlRouterProvider.otherwise("/dashboard");

  $stateProvider
    .state('main', {
      "abstract": true,
      url: "",
      views: {
        "menu": {
          controller: "MenuController",
          templateUrl: "/app/view/layout/menu.html"
        },
        "menuTop": {
          controller: "MenuTopController",
          templateUrl: "/app/view/layout/menuTop.html"
        }
      }
    })
    .state('login', {
      url: "/login",
      views: {
        "content@": {
          controller: "LoginController",
          templateUrl: "/app/view/login.html"
        }
      }
    })
    .state('logout', {
      url: "/logout",
      views: {
        "content@": {
          controller: "LogoutController",
          template: ""
        }
      }
    })
    .state('auth', {
      url: "/auth?token",
      views: {
        "content@": {
          controller: "AuthController",
          template: ""
        }
      }
    })
    .state('main.dashboard', {
      url: "/dashboard",
      views: {
        "content@": {
          controller: "DashboardController",
          templateUrl: "/app/view/dashboard.html"
        }
      }
    })
    .state('main.setting', {
      url: "/settings",
      views: {
        "content@": {
          controller: "SettingController",
          templateUrl: "/app/view/setting.html"
        }
      }
    })
    .state('main.project', {
      url: "/project/:projectName",
      views: {
        "content@": {
          controller: "ProjectController",
          templateUrl: "/app/view/project.html"
        }
      }
    })
    .state('main.project.artifactList', {
      url: "/artifact",
      views: {
        "content@": {
          controller: "ArtifactListController",
          templateUrl: "/app/view/artifactList.html"
        }
      }
    })
    .state('main.project.artifactList.artifact', {
      url: "/:artifactId",
      views: {
        "content@": {
          controller: "ArtifactController",
          templateUrl: "/app/view/artifact.html"
        }
      }
    })
});

angular.module('Chest').run(function ($rootScope, AuthService, EVENT_ENUM, $state) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    // layout managing
    if (toState.name === "login") {
      $rootScope.$emit(EVENT_ENUM.LAYOUT_ONE_COLUMN);
    } else {
      $rootScope.$emit(EVENT_ENUM.LAYOUT_TWO_COLUMN);
    }

    // auth
    var unsecureStates = ["login", "auth", "main"];
    if (unsecureStates.indexOf(toState.name) === -1) {
      if (!AuthService.hasToken()) {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
});
