"use client";
import React from "react";
import {Input} from "@heroui/input";    
import {Button} from "@heroui/button";
import {Form} from "@heroui/form";

export default function SignUp() {
    const [submitted, setSubmitted] = React.useState<any>(null);
    const [error, setError] = React.useState<string | null>(null);
  
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);
      try {
        const res = await fetch("http://localhost:80/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include", // if you're using cookies
        });
  
        const json = await res.json();
        if (!res.ok) {
          setError(json.message || "Failed to register");
          return;
        }
  
        setSubmitted(json.user);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Server is not reachable");
      }
    };
  
    return (
      <Form
        className="w-full max-w-xs"
        style={{ backgroundColor: "#DDFFDA" }}
        onSubmit={onSubmit}
      >
        <Input
          isRequired
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
          type="text"
          color="success"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters long";
            }
  
            return value === "admin" ? "Nice try!" : null;
          }}
        />
        <Input
            isRequired
            label="age"
            labelPlacement="outside"
            name="age"
            placeholder="Enter your age"
            type="number"
            color="success"
            validate={(value) => {
                if (value.length < 2) {
                    return "Age must be at least 2 characters long";    
                }
            }}
        />
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="gender-select">
          Gender
        </label>
        <select
          id="gender-select"
          name="gender"
          required
          className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-success-500"
          defaultValue=""
        >
          <option value="" disabled>
            Select your gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <Input
          isRequired
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
          color="success"
          validate={(value) => {
            if (!value.includes("@")) {
              return "Invalid email address";
            }
          }}
        />
        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          color="success"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters long";
            }
          }}
        />
        <Button color="primary" type="submit">
          Submit
        </Button>
        {submitted && (
          <div className="text-small text-default-500">
            You submitted: <code>{JSON.stringify(submitted)}</code>
          </div>
        )}
      </Form>
    );
  }
  