package com.example.djuproject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class IndexController {

    @GetMapping("/")
    public RedirectView redirectToReact() {
        return new RedirectView("/index.html");
    }

    @RequestMapping("/")
    public String index(){
        return "index";
    }

    @RequestMapping("/create")
    public String create(){
        return "create";
    }
}
