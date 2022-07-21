var app = angular.module("myApp", ["ui.router"]);
app.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/home",
        templateUrl: "home.html",
        controller: "home_ctrl",
      })
      .state("register", {
        url: "/register",
        templateUrl: "register.html",
        controller: "register_ctrl",
      })
      .state("login", {
        url: "/login",
        templateUrl: "login.html",
        controller: "login_ctrl",
      })
      .state("adminlogin", {
        url: "/adminlogin",
        templateUrl: "adminlogin.html",
        controller: "adminlogin_ctrl",
      })
      .state("dashboard", {
        url: "/dashboard",
        templateUrl: "dash.html",
        controller: "dashboard_ctrl",
      })
      .state("dashboard.upload", {
        url: "/dashboard_upload",
        templateUrl: "dash_upload.html",
        controller: "dash_upload_ctrl",
      })
      .state("dashboard.folder", {
        url: "/dashboard_folder",
        templateUrl: "dash_folder.html",
        controller: "dash_folder_ctrl",
      })
      .state("dashboard.openfolder", {
        url: "/dashboard_folder.open/:frid",
        templateUrl: "dash_folder.open.html",
        controller: "dash_folderopen_ctrl",
      })
      .state("dashboard.trash", {
        url: "/dashboard_trash",
        templateUrl: "dash_trash.html",
        controller: "dash_trash_ctrl",
      })
      .state("admindash", {
        url: "/admindash",
        templateUrl: "admindash.html",
        controller: "admin_ctrl",
      })
      .state("admindash.users", {
        url: "/users",
        templateUrl: "admin_user.html",
        controller: "admin_user_ctrl",
      });

    $urlRouterProvider.otherwise("/home");
  },
]);

window.baseUrl = "https://10.21.85.150:8000/";

app.controller("home_ctrl", function () {
  document.getElementById("mainbar").style.display = "block";
});

app.controller("register_ctrl", function ($scope, $http, $filter, $location) {
  document.getElementById("mainbar").style.display = "block";
  dob.max = new Date().toISOString().split("T")[0];
  $scope.register = function () {
    registerobj = {
      first_name: $scope.fname,
      last_name: $scope.lname,
      DOB: $scope.dob,
      Gender: $scope.gender,
      email: $scope.email,
      username: $scope.username,
      password: $scope.pass,
      C_password: $scope.cpass,
      Mobile_Number: $scope.mobile,
    };
    console.log(registerobj);
    if (
      $scope.fname == undefined ||
      $scope.lname == undefined ||
      $scope.dob == undefined ||
      $scope.gender == undefined ||
      $scope.email == undefined ||
      $scope.username == undefined ||
      $scope.pass == undefined ||
      $scope.cpass == undefined ||
      $scope.mobile == undefined ||
      $scope.fname == "" ||
      $scope.lname == "" ||
      $scope.dob == "" ||
      $scope.gender == "" ||
      $scope.email == "" ||
      $scope.username == "" ||
      $scope.pass == "" ||
      $scope.cpass == "" ||
      $scope.mobile == ""
    ) {
      Swal.fire({
        title: "Input Fields are Empty !",
        allowOutsideClick: () => {
          const popup = Swal.getPopup();
          popup.classList.remove("swal2-show");
          setTimeout(() => {
            popup.classList.add("animate__animated", "animate__headShake");
          });
          setTimeout(() => {
            popup.classList.remove("animate__animated", "animate__headShake");
          }, 500);
          return;
        },
      });
      return;
    }
    if ($scope.pass != $scope.cpass) {
      Swal.fire(
        "Oops",
        "Password And Confirm Password does not match!",
        "info"
      );
      return;
    } else {
      $scope.dob = $filter("date")($scope.dob, "yyyy-MM-dd");
      $http({
        method: "POST",
        url: window.baseUrl + "Drive/registration",
        data: registerobj,
        withCredentials: true,
      })
        .then(function (response) {
          console.log(response);
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: "Registered Successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            $location.path("/login");
          }
        })
        .catch(function (error) {
          console.log(error);
          if (error.status == 403) {
            Swal.fire({
              icon: "error",
              title: error.data.message,
            });
          }
          if (error.status == 500) {
            Swal.fire({
              icon: "info",
              title: "Oops...",
              text: "Internal Server Error",
            });
          }
        });
    }
  };
});

app.controller("login_ctrl", function ($scope, $http, $location) {
  document.getElementById("mainbar").style.display = "block";
  $scope.login = function () {
    loginobj = {
      username: $scope.username,
      password: $scope.pass,
    };
    if (
      $scope.username == undefined ||
      $scope.pass == undefined ||
      $scope.username == "" ||
      $scope.pass == ""
    ) {
      Swal.fire({
        title: "Input Fields are Empty !",
        allowOutsideClick: () => {
          const popup = Swal.getPopup();
          popup.classList.remove("swal2-show");
          setTimeout(() => {
            popup.classList.add("animate__animated", "animate__headShake");
          });
          setTimeout(() => {
            popup.classList.remove("animate__animated", "animate__headShake");
          }, 500);
          return;
        },
      });
      return;
    } else {
      $http({
        method: "POST",
        url: window.baseUrl + "Drive/login",
        data: loginobj,
        withCredentials: true,
      })
        .then(function (response) {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: "Logged in Successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            $location.path("/dashboard");
            $scope.username = "";
            $scope.pass = "";
          }
        })
        .catch(function (error) {
          if (error.status == 403) {
            Swal.fire({
              icon: "error",
              title: error.data.message,
            });
          }
          if (error.status == 500) {
            Swal.fire({
              icon: "info",
              title: "Internal Server Error",
            });
          }
        });
    }
  };
});

app.controller("adminlogin_ctrl", function ($scope, $http, $location) {
  document.getElementById("mainbar").style.display = "block";
  $scope.adminlogin = function () {
    loginobj = {
      username: $scope.username,
      password: $scope.pass,
    };
    if (
      $scope.username == undefined ||
      $scope.pass == undefined ||
      $scope.username == "" ||
      $scope.pass == ""
    ) {
      Swal.fire({
        title: "Input Fields are Empty !",
        allowOutsideClick: () => {
          const popup = Swal.getPopup();
          popup.classList.remove("swal2-show");
          setTimeout(() => {
            popup.classList.add("animate__animated", "animate__headShake");
          });
          setTimeout(() => {
            popup.classList.remove("animate__animated", "animate__headShake");
          }, 500);
          return;
        },
      });
      return;
    } else {
      $http({
        method: "POST",
        url: window.baseUrl + "Drive/Admin/login",
        data: loginobj,
        withCredentials: true,
      })
        .then(function (response) {
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: "Admin Login Successful !",
              showConfirmButton: false,
              timer: 1500,
            });
            $location.path("/admindash");
            $scope.username = "";
            $scope.pass = "";
          }
        })
        .catch(function (error) {
          if (error.status == 403) {
            Swal.fire({
              icon: "error",
              title: error.data.message,
            });
          }
          if (error.status == 500) {
            Swal.fire({
              icon: "info",
              title: "Internal Server Error",
            });
          }
        });
    }
  };
});

app.controller("dashboard_ctrl", function ($http, $scope, $location) {
  document.getElementById("mainbar").style.display = "none";
  $http({
    method: "GET",
    url: window.baseUrl + "Drive/home",
    withCredentials: true,
  })
    .then(function (response) {
      console.log(response.data);
      $scope.profile = response.data;
      $scope.progwidth = response.data.PERCENTAGE;
      console.log($scope.progwidth);
      $scope.progressbar = {
        width: $scope.progwidth + "%",
      };
      $scope.dpurl =
        window.baseUrl + "media/" + response.data.Propic.Profile_pic;
    })
    .catch(function (error) {
      if (error.status == 401) {
        $location.path("/home");
        Swal.fire({
          icon: "warning",
          title: error.data.error,
        });
      }
    });

  document.getElementById("upload_pic").onchange = function () {
    showalert();
  };
  function showalert() {
    Swal.fire({
      title: "Change Profile Picture",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        var file = document.getElementById("upload_pic").files[0];
        console.log(file);
        var fd = new FormData();
        console.log(fd);
        fd.append("Profile_pic", file);
        $http({
          method: "POST",
          url: window.baseUrl + "Drive/Propic/upload",
          data: fd,
          withCredentials: true,
          headers: { "Content-Type": undefined },
        }).then(function () {
          Swal.fire({
            icon: "success",
            // position: "top-end",
            title: "Profile Picture Changed Successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          $scope.dpview();
        });
      }
    });
  }
  $scope.drivedisplay = function () {
    $http({
      method: "GET",
      url: window.baseUrl + "Drive/Files/display",
      withCredentials: true,
    }).then(function (response) {
      console.log(response.data);
      $scope.imageurl = window.baseUrl + "media/";
      $scope.images = response.data.User_i;
      $scope.documents = response.data.User_f;
      $scope.mps = response.data.User_av;
    });
  };
  $scope.drivedisplay();
  $scope.viewdoc = function (docid) {
    docidobj = {
      id: docid,
    };
    console.log(docidobj);
    $http({
      method: "POST",
      url: window.baseUrl + "Drive/Files/id/display",
      data: docidobj,
      withCredentials: true,
    }).then(function (response) {
      console.log(response.data);
      $scope.docview = response.data.User_data.Uploads;
      console.log($scope.docview);
      $scope.imageurl = window.baseUrl + "media/";
      window.open(
        $scope.imageurl + $scope.docview,
        "_blank",
        "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=1200,height=500"
      );
    });
  };

  $scope.removedoc = function (docid) {
    Swal.fire({
      title: "Move Document to Trash",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        remdocidobj = {
          id: docid,
        };
        $http({
          method: "POST",
          url: window.baseUrl + "Drive/Files/delete",
          data: remdocidobj,
          withCredentials: true,
        }).then(function () {
          $scope.drivedisplay();
          Swal.fire({
            icon: "success",
            position: "top-end",
            title: "Document moved to Trash",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };

  $scope.driveimgbig = function (imgid) {
    driveimgidobj = {
      id: imgid,
    };
    console.log(driveimgidobj);
    $http({
      method: "POST",
      url: window.baseUrl + "Drive/Files/id/display",
      data: driveimgidobj,
      withCredentials: true,
    }).then(function (response) {
      console.log(response.data);
      $scope.imageurl = window.baseUrl + "media/";
      $scope.viewimg = response.data.User_data;
    });
  };

  $scope.removeimg = function (imgid) {
    image_id = {
      id: imgid,
    };
    $http({
      method: "POST",
      url: window.baseUrl + "Drive/Files/delete",
      data: image_id,
      withCredentials: true,
    }).then(function (response) {
      $scope.imagedisplay();
      Swal.fire({
        icon: "success",
        position: "top-end",
        title: "Image moved to Trash",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  $scope.logout = function () {
    $http({
      method: "GET",
      url: window.baseUrl + "Drive/logout",
      withCredentials: true,
    }).then(function (response) {
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          position: "top-end",
          title: "Logged Out Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      $location.path("/home");
    });
  };
});

app.controller("dash_upload_ctrl", function ($scope, $http) {
  document.getElementById("upload_file").onchange = function () {
    showfilelist();
  };
  function showfilelist() {
    console.log("hello");
    $scope.fileselected = true;
    console.log($scope.fileselected);
    var file = document.getElementById("upload_file").files[0];
    console.log(file);
    var fd = new FormData();
    console.log(fd);
    fd.append("Uploaded_files", file);
    $scope.filename = file.name;
    console.log($scope.filename);
    Swal.fire({
      title: "Upload Selected Files",
      position: "top-end",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        $http({
          method: "POST",
          url: window.baseUrl + "Drive/Files/upload",
          data: fd,
          withCredentials: true,
          headers: { "Content-Type": undefined },
        })
          .then(function () {
            Swal.fire({
              icon: "success",
              // position: "top-end",
              title: "Files Uploaded Successfully !",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(function (error) {
            if (error.status == 403) {
              Swal.fire({
                icon: "error",
                title: error.data.message,
              });
            }
          });
      }
    });
  }
});

app.controller("dash_folder_ctrl", function ($scope, $http) {
  $scope.folderdisplay = function () {
    $http({
      method: "GET",
      url: window.baseUrl + "Drive/Folder/dash",
      withCredentials: true,
    }).then(function (response) {
      console.log(response.data);
      $scope.folders = response.data.Folder_detail;
    });
  };
  $scope.folderdisplay();
  $scope.createfolder = function (frname) {
    frnameobj = {
      Folder: frname,
    };
    $http({
      method: "POST",
      url: window.baseUrl + "Drive/Folder/root",
      data: frnameobj,
      withCredentials: true,
    })
      .then(function () {
        $scope.folderdisplay();
        Swal.fire({
          icon: "success",
          position: "top-end",
          title: "Folder Created",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(function (error) {
        if (error.status == 403) {
          Swal.fire({
            icon: "error",
            title: error.data.message,
          });
        }
      });
  };
  $scope.openfolder = function (frid) {
    $http({
      method: "POST",
      url: window.baseUrl + "Drive/Folder/files/display",
      data: { id: frid },
      withCredentials: true,
    }).then(function (response) {
      console.log(response.data);
    });
  };
  $scope.deletefolder = function (folderid) {
    console.log("hurray");
    delfoldid = {
      id: folderid,
    };
    Swal.fire({
      title: "Delete Folder",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        $http({
          method: "POST",
          url: window.baseUrl + "Drive/Folder/delete",
          data: delfoldid,
          withCredentials: true,
        }).then(function () {
          $scope.folderdisplay();
          Swal.fire({
            icon: "success",
            // position: "top-end",
            title: "Folder Deleted Successfully !",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };
});

app.controller("dash_folderopen_ctrl", function ($scope, $http, $stateParams) {
  $scope.folderfiledisplay = function () {
    filedispid = {
      id: $stateParams.frid,
    };
    $http({
      method: "POST",
      url: window.baseUrl + "Drive/Folder/files/display",
      data: filedispid,
      withCredentials: true,
    }).then(function (response) {
      console.log(response.data);
      $scope.imageurl = window.baseUrl + "media/";
      $scope.folderfiles = response.data.Files_detail;
      $scope.folderimages = response.data.Images_detail;
      $scope.folders = response.data.Folders_detail;
      if ($scope.folderimages.length == 0) {
        $scope.imgavail = true;
      }
      if ($scope.folderfiles.length == 0) {
        $scope.fileavail = true;
      }
      if (
        $scope.folderfiles.length == 0 &&
        $scope.folderimages.length == 0 &&
        $scope.folders.length == 0
      ) {
        $scope.emptyfolder = true;
      }
    });
  };
  $scope.folderfiledisplay();
  document.getElementById("upload_frfile").onchange = function () {
    frfileupload();
  };
  function frfileupload() {
    var folid = $stateParams.frid;
    var file = document.getElementById("upload_frfile").files[0];
    var fd = new FormData();
    console.log(fd);
    fd.append("Uploaded_files", file);
    fd.append("id", folid);
    $scope.filename = file.name;
    console.log(folid);
    console.log($scope.filename);
    Swal.fire({
      title: "Upload Selected Files",
      position: "top-end",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        $http({
          method: "POST",
          url: window.baseUrl + "Drive/Folder/files/upload",
          data: fd,
          withCredentials: true,
          headers: { "Content-Type": undefined },
        })
          .then(function () {
            $scope.folderfiledisplay();
            Swal.fire({
              icon: "success",
              // position: "top-end",
              title: "Files Uploaded Successfully !",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(function (error) {
            if (error.status == 403) {
              Swal.fire({
                icon: "error",
                title: error.data.message,
              });
            }
          });
      }
    });
  }
  $scope.createfolder = function (frname) {
    frnameobj = {
      Folder: frname,
      id: $stateParams.frid,
    };
    console.log(frnameobj);
    $http({
      method: "POST",
      url: window.baseUrl + "Drive/Folder/create",
      data: frnameobj,
      withCredentials: true,
    })
      .then(function () {
        $scope.folderfiledisplay();
        Swal.fire({
          icon: "success",
          position: "top-end",
          title: "Folder Created",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(function (error) {
        if (error.status == 403) {
          Swal.fire({
            icon: "error",
            title: error.data.message,
          });
        }
      });
  };
  $scope.deletefolder = function (folderid) {
    console.log("hurray");
    delfoldid = {
      id: folderid,
    };
    Swal.fire({
      title: "Delete Folder",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        $http({
          method: "POST",
          url: window.baseUrl + "Drive/Folder/delete",
          data: delfoldid,
          withCredentials: true,
        }).then(function () {
          $scope.folderfiledisplay();
          Swal.fire({
            icon: "success",
            // position: "top-end",
            title: "Folder Deleted Successfully !",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };
  $scope.openfolder = function (frid) {
    console.log(frid);
    $http({
      method: "POST",
      url: window.baseUrl + "Drive/Folder/files/display",
      data: { id: frid },
      withCredentials: true,
    }).then(function (response) {
      $scope.folderfiledisplay();
      console.log(response.data);
    });
  };
  $scope.viewfiles = function (fileid) {
    fileidobj = {
      id: fileid,
    };
    console.log(fileidobj);
    $http({
      method: "POST",
      url: window.baseUrl + "Drive/Files/id/display",
      data: fileidobj,
      withCredentials: true,
    }).then(function (response) {
      console.log(response.data);
      $scope.docview = response.data.User_data.Uploads;
      console.log($scope.docview);
      $scope.imageurl = window.baseUrl + "media/";
      window.open(
        $scope.imageurl + $scope.docview,
        "_blank",
        "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=1200,height=500"
      );
    });
  };
  $scope.removeimg = function (imgid) {
    Swal.fire({
      title: "Move Image to Trash",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        remimgidobj = {
          id: imgid,
        };
        $http({
          method: "POST",
          url: window.baseUrl + "Drive/Files/delete",
          data: remimgidobj,
          withCredentials: true,
        }).then(function () {
          $scope.folderfiledisplay();
          Swal.fire({
            icon: "success",
            position: "top-end",
            title: "Document moved to Trash",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };
  $scope.removedoc = function (docid) {
    Swal.fire({
      title: "Move Document to Trash",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        remdocidobj = {
          id: docid,
        };
        $http({
          method: "POST",
          url: window.baseUrl + "Drive/Files/delete",
          data: remdocidobj,
          withCredentials: true,
        }).then(function () {
          $scope.folderfiledisplay();
          Swal.fire({
            icon: "success",
            position: "top-end",
            title: "Document moved to Trash",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };
});

app.controller("dash_trash_ctrl", function ($scope, $http) {
  $scope.limitupdate = function () {
    $http({
      method: "GET",
      url: window.baseUrl + "Drive/Files/size",
      withCredentials: true,
    }).then(function (response) {
      console.log(response.data);
    });
  };
  $scope.trashimgdisplay = function () {
    $http({
      method: "GET",
      url: window.baseUrl + "Drive/Trash",
      withCredentials: true,
    }).then(function (response) {
      if (response.status == 200) {
        console.log(response.data);
        $scope.imageurl = window.baseUrl + "media/";
        $scope.trashimages = response.data.Trash_i;
        $scope.trashfolders = response.data.Trash_f;
        $scope.trashdocs = response.data.Trash_d;
        if (
          response.data.Trash_i.length == 0 &&
          response.data.Trash_f.length == 0 &&
          response.data.Trash_d.length == 0
        ) {
          $scope.emptytrash = true;
        }
      }
    });
  };
  $scope.trashimgdisplay();
  $scope.restorefolder = function (trfrid) {
    trfrobj = {
      id: trfrid,
    };
    console.log(trfrobj);
    Swal.fire({
      text: "Restore Folder",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        $http({
          method: "POST",
          url: window.baseUrl + "Drive/Folder/restore",
          data: trfrobj,
          withCredentials: true,
        }).then(function () {
          $scope.limitupdate();
          $scope.trashimgdisplay();
          Swal.fire({
            icon: "success",
            position: "top-end",
            title: "File Restored Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };
  $scope.restoreimg = function (imgid) {
    resimgidobj = {
      id: imgid,
    };
    Swal.fire({
      text: "Restore File",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        $http({
          method: "POST",
          url: window.baseUrl + "Drive/Files/restore",
          data: resimgidobj,
          withCredentials: true,
        }).then(function () {
          $scope.trashimgdisplay();
          Swal.fire({
            icon: "success",
            position: "top-end",
            title: "File Restored Succesfully",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };
  $scope.deltrashimg = function (resimgid) {
    deltrashimgidobj = {
      id: resimgid,
    };
    Swal.fire({
      text: "Folder once removed can't be restored",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        $http({
          method: "POST",
          url: window.baseUrl + "Drive/Trash/File/delete",
          data: deltrashimgidobj,
          withCredentials: true,
        }).then(function () {
          $scope.limitupdate();
          $scope.trashimgdisplay();
          Swal.fire({
            icon: "success",
            position: "top-end",
            title: "File Deleted",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };
  $scope.imagebig = function (trashid) {
    trid = {
      id: trashid,
    };
    console.log(trid);
    $http({
      method: "POST",
      url: window.baseUrl + "Drive/Files/id/display",
      data: trid,
      withCredentials: true,
    }).then(function (response) {
      console.log(response.data);
      $scope.imageurl = window.baseUrl + "media/";
      $scope.idimg = response.data.User_data;
    });
  };
  $scope.cleartrash = function () {
    Swal.fire({
      title: "Empty Trash !",
      text: "Data once removed can't be restored",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        $http({
          method: "GET",
          url: window.baseUrl + "Drive/Trash/clear",
          withCredentials: true,
        }).then(function () {
          $scope.limitupdate();
          $scope.trashimgdisplay();
          Swal.fire({
            icon: "success",
            position: "top-end",
            title: "Folder Deleted",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };
  $scope.deletetrashfolder = function (trfrid) {
    trfrobj = {
      id: trfrid,
    };
    console.log(trfrobj);
    Swal.fire({
      text: "Folder once removed can't be restored",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        $http({
          method: "POST",
          url: window.baseUrl + "Drive/Trash/Folder/delete",
          data: trfrobj,
          withCredentials: true,
        }).then(function () {
          $scope.limitupdate();
          $scope.trashimgdisplay();
          Swal.fire({
            icon: "success",
            position: "top-end",
            title: "Folder Deleted",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };
});

app.controller("admin_ctrl", function ($scope, $http, $location) {
  document.getElementById("mainbar").style.display = "none";
  $scope.imageurl = window.baseUrl + "media/static/Admin-profile.png";
  $http({
    method: "GET",
    url: window.baseUrl + "Drive/Admin/home",
    withCredentials: true,
  })
    .then(function (response) {
      console.log(response.data);
      $scope.profile = response.data;
    })
    .catch(function (error) {
      if (error.status == 401) {
        $location.path("/home");
        Swal.fire({
          icon: "warning",
          title: error.data.error,
        });
      }
    });

  $http({
    method: "GET",
    url: window.baseUrl + "Drive/Admin/Limit",
    withCredentials: true,
  }).then(function (response) {
    console.log(response.data.FILE);
    $scope.filesizes = response.data.FILE;
  });

  $scope.logout = function () {
    $http({
      method: "GET",
      url: window.baseUrl + "Drive/logout",
      withCredentials: true,
    }).then(function (response) {
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          position: "top-end",
          title: "Logged Out Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      $location.path("/home");
    });
  };
});

app.controller("admin_user_ctrl", function ($http, $scope) {
  $http({
    method: "GET",
    url: window.baseUrl + "Drive/Admin/users",
    withCredentials: true,
  }).then(function (response) {
    console.log(response.data.USER);
    $scope.userdetails = response.data.USER;
  });

  $scope.upload = function (limit, userid) {
    updateobj = {
      size: limit,
      id: userid,
    };
    console.log(updateobj);
    $http({
      method: "POST",
      url: window.baseUrl + "Drive/Admin/Limit/upd",
      data: updateobj,
      withCredentials: true,
    }).then(function (response) {
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Limit Updated Successfully !",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };
});
