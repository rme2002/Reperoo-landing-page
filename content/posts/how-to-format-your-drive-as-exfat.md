---
title: How to format your SSD or hard drive as exFAT
date: 2026-09-15
author: The Reperoo team
excerpt: exFAT works on iPhone, Mac and Windows and handles files over 4 GB. Here's how to set your drive up in a couple of minutes.
cover: /images/blog-exfat.svg
---

Your iPhone can write to USB-C drives, but the format matters. **exFAT** is the one to pick: iPhones, Macs and Windows PCs can all read and write it, and unlike FAT32 it handles files over 4 GB, which a few minutes of 4K video quickly reaches.

## Check your drive first

On a Mac, open **Disk Utility**, select the drive and read the format under its name. On Windows, right-click the drive in **File Explorer**, choose **Properties** and read **File system**.

If it says exFAT, you're done: skip to the end. If it says NTFS, your iPhone can only read it, so format it as below. FAT32 works, but files over 4 GB won't copy.

> Formatting erases everything on the drive. Copy anything you want to keep off it first.

## On a Mac

1. Plug in the drive and open **Disk Utility**.
2. Choose **View → Show All Devices**, then select the drive itself in the sidebar.
3. Click **Erase**.
4. Set **Format** to **ExFAT** and **Scheme** to **GUID Partition Map**.
5. Click **Erase** and wait for it to finish.

## On Windows

1. Plug in the drive and open **File Explorer**.
2. Right-click the drive and choose **Format**.
3. Set **File system** to **exFAT** and leave the allocation unit size at its default.
4. Click **Start**.

## Then, once Reperoo is out

When Reperoo launches, plug the drive into your iPhone, tap **Connect** and pick a folder on it. Reperoo shows the free space straight away, and you're ready to copy.
