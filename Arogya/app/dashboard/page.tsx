"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, Avatar } from "@heroui/react";
import { useUser } from "@/context/UserContext";

export default function Profile() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    age: "",
    address: "",
    phone: "",
    dob: "",
    bloodGroup: "",
    diagnosis: "",
    allergies: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:80/users/profile", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({
            ...prev,
            age: data.age || "",
            address: data.address || "",
            phone: data.phone || "",
            dob: data.dob?.split("T")[0] || "",
            bloodGroup: data.bloodGroup || "",
            diagnosis: data.diagnosis || "",
            allergies: data.allergies || "",
          }));
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:80/users/profile", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        alert("Changes saved!");
        console.log("Updated user:", data.user);
      } else {
        const err = await res.json();
        alert("Failed to save: " + err.message);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Something went wrong.");
    }
  };

  const firstName = user?.name?.split(" ")[0] || "";
  const initial = firstName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-specialGothic text-foreground">Patient Profile</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[240px_1fr] gap-6">
        {/* Avatar Panel */}
        <div className="bg-green-100/10 backdrop-blur-md shadow-xl rounded-lg flex flex-col items-center justify-center w-full aspect-square">
          <Avatar
            isBordered
            className="bg-success font-opensans text-white border-black text-3xl w-20 h-20"
            name={initial}
          />
          <h2 className="text-lg font-opensans font-semibold text-foreground mt-2">
            {user?.name || "Patient Name"}
          </h2>
          <p className="text-sm text-gray-500">{formData.phone || "Phone not set"}</p>
        </div>

        {/* Main Info Grid */}
        <div className="grid xl:grid-cols-3 gap-4">
          {/* General Info */}
          <div className="bg-green-100/10 backdrop-blur-md p-4 rounded-lg shadow-xl space-y-3 xl:col-span-1">
            <h3 className="font-specialGothic font-medium text-sm mb-1">General Information</h3>

            <div>
              <label className="text-xs font-opensans text-foreground">Date of Birth</label>
              <Input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                size="sm"
                className="font-opensans text-foreground font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-opensans">Age</label>
              <Input type="number" name="age" value={formData.age} onChange={handleChange} size="sm" />
            </div>

            <div>
              <label className="text-xs font-opensans">Address</label>
              <Input name="address" value={formData.address} onChange={handleChange} className="font-opensans" size="sm" />
            </div>

            <div>
              <label className="text-xs font-opensans text-foreground">Phone</label>
              <Input type="number" name="phone" value={formData.phone} onChange={handleChange} className="font-opensans" size="sm" />
            </div>

            <div>
              <label className="text-xs font-opensans text-foreground">Blood Group</label>
              <Input
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="font-opensans"
                size="sm"
                placeholder="e.g. B+ / O-"
              />
            </div>
          </div>

          {/* Medical Info */}
          <div className="bg-green-100/10 shadow-xl p-4 rounded-lg space-y-3 xl:col-span-1">
            <h3 className="font-specialGothic font-medium text-sm mb-1">Medical Info</h3>

            <div>
              <label className="text-xs font-opensans text-foreground">Diagnosis</label>
              <Input name="diagnosis" value={formData.diagnosis} onChange={handleChange} className="font-opensans" size="sm" />
            </div>

            <div>
              <label className="text-xs font-opensans text-foreground">Allergies</label>
              <Input name="allergies" value={formData.allergies} onChange={handleChange} className="font-opensans" size="sm" />
            </div>
          </div>

          {/* Files & Notes */}
          <div className="space-y-4 xl:col-span-1">
            <div className="bg-green-100/10 shadow-xl p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-opensans text-foreground font-semibold">Files</h3>
                <Button variant="light" size="sm" className="font-opensans font-semibold">
                  Download
                </Button>
              </div>
              <p className="text-center font-opensans font-semibold text-sm text-gray-400">No files uploaded</p>
            </div>

            <div className="bg-green-100/10 shadow-xl p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-opensans text-foreground font-semibold">Notes</h3>
                <Button variant="light" size="sm" className="font-opensans text-foreground font-semibold">
                  Download
                </Button>
              </div>
              <p className="text-center text-sm font-opensans font-semibold text-gray-400">No notes available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 text-center">
        <Button
          color="default"
          className="px-8 py-2 font-specialGothic text-base w-48"
          onClick={handleSave}
        >
          Save Profile
        </Button>
      </div>
    </div>
  );
}
