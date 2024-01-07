package com.zone.connect.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/demo")
public class DemoController {

    @GetMapping("/test")
    public String test(
            HttpServletRequest request) {

        return "Secured Hello Test";
    }
}
