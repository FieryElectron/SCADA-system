# SCADA-system

This SCADA system has the following features.

* Project Oriented
* Edit mode & Display mode
* Message transmission based on CGI (Common Gateway Interface)
* Elements & Library manipulation
* Datapoint & Action binding
* Device status mapping & controling
* Graphical Indication customizing
  
This App was developed based on https://github.com/methodofaction/Method-Draw

<img src="Animation.gif" width="400" height="200" />


## lighttpd.conf
Add mod_cgi.

    server.modules = (
        "mod_indexfile",
        "mod_access",
        "mod_alias",
        "mod_redirect",
        "mod_cgi",
        )

Enable cgi call.

    $HTTP["url"] =~ "/cgi-bin/" {
            cgi.assign = ( "" => "" )
    }

    cgi.assign      = (
            ".cgi"  => ""
    )