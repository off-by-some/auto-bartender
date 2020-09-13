#!/bin/bash
LOOPDEVICE=$1
set -e

echo -e "\nCreating disk image...\n"
dd if=/dev/zero of=/os/linux.img bs=$(expr 1024 \* 1024 \* 1024) count=1

echo -e "\nCreating partition...\n"
sfdisk /os/linux.img < /os/partition.txt

echo -e "\nFormatting partition with ext3...\n"
losetup -D
losetup -o $(expr 512 \* 2048) $LOOPDEVICE /os/linux.img
mkfs.ext3 $LOOPDEVICE

echo -e "\nCopying linux directory structure to partition...\n"
mkdir -p /os/mnt

mount -t auto $LOOPDEVICE /os/mnt/

cp -R /os/linux.dir/. /os/mnt/

echo -e "\nSetting up extlinux...\n"
apt-get update && apt-get install -y extlinux
extlinux --install /os/mnt/boot/
cp /os/${DISTR}/syslinux.cfg /os/mnt/boot/syslinux.cfg

echo -e "\n[Unmount]"
umount /os/mnt
losetup -D

echo -e "\n[Write syslinux MBR]"
dd if=/usr/lib/syslinux/mbr/mbr.bin of=/os/linux.img bs=440 count=1 conv=notrunc
